const dns = require('node:dns');
const http = require("http");
const url = require('url');

async function getResolution(url) {
  const nameservers = dns.getServers();
  const resolver = new dns.promises.Resolver();
  resolver.setServers(nameservers);
  const addresses = await resolver.resolve4(url);
  return addresses;
}

function getDomainName(requestUrl) {
  const parsedUrl = url.parse(requestUrl);
  const pathname = parsedUrl.pathname;
  if(pathname == null) {
    return '/';
  }
  const domainName = pathname.replace(/^www\./, '').replace('/','');
  const sanitizedDomainName = domainName.replace(/[^a-zA-Z0-9.-]/g, '');
  return sanitizedDomainName;
}

const requestListener = async (req, res) => {
  if (req.method === "GET") {
    const reqUrl = url.parse(req.url).pathname
    if (reqUrl === "/") {
      res.write('');
      res.end();
    }
    else {
      const domainName = getDomainName(req.url);
      try {
        const addresses = await getResolution(domainName);
        const result = {
          ip_addresses: addresses,
          nameservers: dns.getServers(),
          url: domainName
        }
        res.writeHead(200, {
          'Content-Type': 'application/json' });
        res.write(JSON.stringify(result,null,2));
        res.end();
      }
      catch {
        console.log(`Failed to resolve domain, ${domainName}`);
        const error = {
          'error': `Failed to resolve ${domainName} using nameservers ${dns.getServers()}`
        }
        res.writeHead(404, {
          'Content-Type': 'application/json' });
        res.write(JSON.stringify(error,null,2));
        res.end();
      }
    }
  } 
  
  else {
    const error = {
      'error': 'Bad Request, only supporting HTTP GET requests'
    }
    res.writeHead(400, {
      'Content-Type': 'application/json' });
    res.write(JSON.stringify(error,null,2));
    res.end();
  }
};

const host = 'localhost';
const port = process.env.SERVER_PORT || 8000;

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

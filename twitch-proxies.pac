var proxyList = [
  "https://api.ttv.lol:8080",
  "https://eu.luminous.dev:8080",
  "https://lb-eu.perfprod.com:8080",
  "https://lb-eu2.perfprod.com:8080"
];
var currentIndex = 0;

function FindProxyForURL(url, host) {
  if ( (shExpMatch(host, "*.twitch.tv") && !shExpMatch(url, "*/videos/*")) || shExpMatch(host, "*.wieistmeineip.de") ) {
    var proxy = proxyList[currentIndex];
    currentIndex = (currentIndex + 1) % proxyList.length;
    return "PROXY " + proxy;
  }
  return "DIRECT";
}

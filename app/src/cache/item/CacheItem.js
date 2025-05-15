function CacheItem(ttl) {
  this.ttl = ttl;
  this.getTtl = function() {
    return this.ttl;
  }
  this.setTtl = function(ttl) {
    this.ttl = ttl;
  }
}
export default CacheItem
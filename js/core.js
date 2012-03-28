//========================================
// Core
//
// base classes
//========================================

// create root scope if not exists
var VECNIK = VECNIK || {};

(function(VECNIK) {

    //========================================
    // Events
    //
    // event management
    //========================================

    function Event() {}
    Event.prototype.on = function(evt, callback) {
        var cb = this.callbacks = this.callbacks || {};
        var l = cb[evt] || (cb[evt] = []);
        l.push(callback);
    };

    Event.prototype.emit = function(evt) {
        var c = this.callbacks && this.callbacks[evt];
        for(var i = 0; c && i < c.length; ++i) {
            c[i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    };


    // http get
    // should be improved
    function get(url, callback) {
      var mygetrequest= new XMLHttpRequest();
      mygetrequest.onreadystatechange=function() {
        if (mygetrequest.readyState == 4){
          if (mygetrequest.status == 200){
            callback(JSON.parse(mygetrequest.responseText));
          }
          else {
            //error
          }
        }
      };
      mygetrequest.open("GET", url, true)
      mygetrequest.send(null)
    }

    //========================================
    // model
    //
    // pretty basic model funcionallity
    //========================================

    function Model() {
      this.data = null; // serializable data
    }

    Model.prototype = new Event();

    Model.prototype.set = function(data) {
      this.data = data;
      this.emit('change', data);
    };

    Model.prototype.destroy = function() {
      this.emit('destroy');
      delete this.data;
    };


    VECNIK.Event = Event;
    VECNIK.Model = Model;
    VECNIK.get = get;

})(VECNIK);

if (typeof module !== 'undefined' && module.exports) {
  module.exports.Event = VECNIK.Event;
  module.exports.Model = VECNIK.Model;
}

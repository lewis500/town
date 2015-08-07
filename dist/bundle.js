(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Car, Ctrl, _, angular, d3, visDer;

angular = require('angular');

d3 = require('d3');

_ = require('lodash');

Car = (function() {
  function Car(loc1) {
    this.loc = loc1;
    this.id = _.uniqueId();
    this.vel = .1;
  }

  Car.prototype.move = function(dt) {
    return this.loc = (this.loc + this.vel * dt / 1000) % 1;
  };

  return Car;

})();

Ctrl = (function() {
  function Ctrl(scope, el) {
    this.scope = scope;
    this.cars = _.range(0, 20).map(function(n) {
      var loc;
      loc = n / 20;
      return new Car(loc);
    });
    this.road = d3.select(el[0]).select('#greyRoad').node();
    this.road_length = this.road.getTotalLength();
  }

  Ctrl.prototype.place_car = function(car) {
    var angle, diffX, diffY, p0, p1, x, y;
    p0 = this.road.getPointAtLength(car.loc * this.road_length);
    p1 = this.road.getPointAtLength((car.loc + .002) % 1 * this.road_length);
    diffX = p1.x - p0.x;
    diffY = p1.y - p0.y;
    angle = 180 / Math.PI * Math.atan2(diffY, diffX);
    x = p0.x;
    y = p0.y;
    return "translate(" + x + "," + y + ") rotate(" + angle + ")";
  };

  Ctrl.prototype.click = function() {
    if (this.paused) {
      return this.play();
    } else {
      return this.pause();
    }
  };

  Ctrl.prototype.pause = function() {
    return this.paused = true;
  };

  Ctrl.prototype.play = function() {
    var last;
    this.pause();
    d3.timer.flush();
    this.paused = false;
    last = 0;
    return d3.timer((function(_this) {
      return function(elapsed) {
        var dt;
        dt = elapsed - last;
        _this.cars.forEach(function(car) {
          return car.move(dt);
        });
        _this.scope.$evalAsync();
        last = elapsed;
        return _this.paused;
      };
    })(this));
  };

  return Ctrl;

})();

visDer = function() {
  var directive;
  return directive = {
    scope: {},
    controllerAs: 'vm',
    templateUrl: './styles/town.svg',
    controller: ['$scope', '$element', Ctrl]
  };
};

angular.module('mainApp', []).directive('visDer', visDer);



},{"angular":undefined,"d3":undefined,"lodash":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvdG93bjIvYXBwL2FwcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsU0FBUjs7QUFDVixFQUFBLEdBQUssT0FBQSxDQUFRLElBQVI7O0FBQ0wsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSOztBQUVFO0VBQ1EsYUFBQyxJQUFEO0lBQUMsSUFBQyxDQUFBLE1BQUQ7SUFDYixJQUFDLENBQUEsRUFBRCxHQUFNLENBQUMsQ0FBQyxRQUFGLENBQUE7SUFDTixJQUFDLENBQUEsR0FBRCxHQUFPO0VBRks7O2dCQUliLElBQUEsR0FBTSxTQUFDLEVBQUQ7V0FDTCxJQUFDLENBQUEsR0FBRCxHQUFPLENBQUMsSUFBQyxDQUFBLEdBQUQsR0FBTyxJQUFDLENBQUEsR0FBRCxHQUFPLEVBQVAsR0FBWSxJQUFwQixDQUFBLEdBQTBCO0VBRDVCOzs7Ozs7QUFHRDtFQUNRLGNBQUMsS0FBRCxFQUFTLEVBQVQ7SUFBQyxJQUFDLENBQUEsUUFBRDtJQUViLElBQUMsQ0FBQSxJQUFELEdBQVEsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxDQUFSLEVBQVksRUFBWixDQUNQLENBQUMsR0FETSxDQUNGLFNBQUMsQ0FBRDtBQUVKLFVBQUE7TUFBQSxHQUFBLEdBQU0sQ0FBQSxHQUFJO2FBQ04sSUFBQSxHQUFBLENBQUksR0FBSjtJQUhBLENBREU7SUFNUixJQUFDLENBQUEsSUFBRCxHQUFRLEVBQUUsQ0FBQyxNQUFILENBQVUsRUFBRyxDQUFBLENBQUEsQ0FBYixDQUNQLENBQUMsTUFETSxDQUNDLFdBREQsQ0FFUCxDQUFDLElBRk0sQ0FBQTtJQUlSLElBQUMsQ0FBQSxXQUFELEdBQWUsSUFBQyxDQUFBLElBQUksQ0FBQyxjQUFOLENBQUE7RUFaSDs7aUJBY2IsU0FBQSxHQUFXLFNBQUMsR0FBRDtBQUNWLFFBQUE7SUFBQSxFQUFBLEdBQUssSUFBQyxDQUFBLElBQUksQ0FBQyxnQkFBTixDQUF1QixHQUFHLENBQUMsR0FBSixHQUFVLElBQUMsQ0FBQSxXQUFsQztJQUNMLEVBQUEsR0FBSyxJQUFDLENBQUEsSUFBSSxDQUFDLGdCQUFOLENBQXVCLENBQUMsR0FBRyxDQUFDLEdBQUosR0FBVSxJQUFYLENBQUEsR0FBaUIsQ0FBakIsR0FBb0IsSUFBQyxDQUFBLFdBQTVDO0lBRUwsS0FBQSxHQUFRLEVBQUUsQ0FBQyxDQUFILEdBQU8sRUFBRSxDQUFDO0lBQ2xCLEtBQUEsR0FBUSxFQUFFLENBQUMsQ0FBSCxHQUFPLEVBQUUsQ0FBQztJQUNsQixLQUFBLEdBQVEsR0FBQSxHQUFNLElBQUksQ0FBQyxFQUFYLEdBQWdCLElBQUksQ0FBQyxLQUFMLENBQVcsS0FBWCxFQUFtQixLQUFuQjtJQUV4QixDQUFBLEdBQUksRUFBRSxDQUFDO0lBQ1AsQ0FBQSxHQUFJLEVBQUUsQ0FBQztXQUVQLFlBQUEsR0FBYSxDQUFiLEdBQWUsR0FBZixHQUFrQixDQUFsQixHQUFvQixXQUFwQixHQUErQixLQUEvQixHQUFxQztFQVgzQjs7aUJBYVgsS0FBQSxHQUFPLFNBQUE7SUFBRyxJQUFHLElBQUMsQ0FBQSxNQUFKO2FBQWdCLElBQUMsQ0FBQSxJQUFELENBQUEsRUFBaEI7S0FBQSxNQUFBO2FBQTZCLElBQUMsQ0FBQSxLQUFELENBQUEsRUFBN0I7O0VBQUg7O2lCQUNQLEtBQUEsR0FBTSxTQUFBO1dBQUcsSUFBQyxDQUFBLE1BQUQsR0FBVTtFQUFiOztpQkFDTixJQUFBLEdBQU0sU0FBQTtBQUNMLFFBQUE7SUFBQSxJQUFDLENBQUEsS0FBRCxDQUFBO0lBQ0EsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFULENBQUE7SUFDQSxJQUFDLENBQUEsTUFBRCxHQUFVO0lBQ1YsSUFBQSxHQUFPO1dBQ1AsRUFBRSxDQUFDLEtBQUgsQ0FBUyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsT0FBRDtBQUNSLFlBQUE7UUFBQSxFQUFBLEdBQUssT0FBQSxHQUFVO1FBQ2YsS0FBQyxDQUFBLElBQUksQ0FBQyxPQUFOLENBQWMsU0FBQyxHQUFEO2lCQUNiLEdBQUcsQ0FBQyxJQUFKLENBQVMsRUFBVDtRQURhLENBQWQ7UUFFQSxLQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsQ0FBQTtRQUNBLElBQUEsR0FBTztlQUNQLEtBQUMsQ0FBQTtNQU5PO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFUO0VBTEs7Ozs7OztBQWFQLE1BQUEsR0FBUyxTQUFBO0FBQ1IsTUFBQTtTQUFBLFNBQUEsR0FDQztJQUFBLEtBQUEsRUFBTyxFQUFQO0lBQ0EsWUFBQSxFQUFjLElBRGQ7SUFFQSxXQUFBLEVBQWEsbUJBRmI7SUFHQSxVQUFBLEVBQVksQ0FBQyxRQUFELEVBQVcsVUFBWCxFQUF1QixJQUF2QixDQUhaOztBQUZPOztBQU9ULE9BQU8sQ0FBQyxNQUFSLENBQWUsU0FBZixFQUEyQixFQUEzQixDQUNDLENBQUMsU0FERixDQUNZLFFBRFosRUFDc0IsTUFEdEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiYW5ndWxhciA9IHJlcXVpcmUgJ2FuZ3VsYXInXG5kMyA9IHJlcXVpcmUgJ2QzJ1xuXyA9IHJlcXVpcmUgJ2xvZGFzaCdcblxuY2xhc3MgQ2FyXG5cdGNvbnN0cnVjdG9yOiAoQGxvYyktPlxuXHRcdEBpZCA9IF8udW5pcXVlSWQoKVxuXHRcdEB2ZWwgPSAuMVxuXHRcdCNsb2MgaXMgYSBwZXJjZW50YWdlIGFyb3VuZCB0aGUgY2lyY2xlXG5cdG1vdmU6IChkdCktPlxuXHRcdEBsb2MgPSAoQGxvYyArIEB2ZWwgKiBkdCAvIDEwMDApJTFcblxuY2xhc3MgQ3RybFxuXHRjb25zdHJ1Y3RvcjogKEBzY29wZSwgZWwpLT5cblx0XHQjIE1BS0UgQ0FSU1xuXHRcdEBjYXJzID0gXy5yYW5nZSAwICwgMjBcblx0XHRcdC5tYXAgKG4pLT5cblx0XHRcdFx0I0lOSVRJQUwgTE9DQVRJT05cblx0XHRcdFx0bG9jID0gbiAvIDIwXG5cdFx0XHRcdG5ldyBDYXIgbG9jXG5cblx0XHRAcm9hZCA9IGQzLnNlbGVjdCBlbFswXVxuXHRcdFx0LnNlbGVjdCAnI2dyZXlSb2FkJ1xuXHRcdFx0Lm5vZGUoKVxuXG5cdFx0QHJvYWRfbGVuZ3RoID0gQHJvYWQuZ2V0VG90YWxMZW5ndGgoKVxuXG5cdHBsYWNlX2NhcjogKGNhciktPlxuXHRcdHAwID0gQHJvYWQuZ2V0UG9pbnRBdExlbmd0aCBjYXIubG9jICogQHJvYWRfbGVuZ3RoXG5cdFx0cDEgPSBAcm9hZC5nZXRQb2ludEF0TGVuZ3RoIChjYXIubG9jICsgLjAwMiklMSAqQHJvYWRfbGVuZ3RoXG5cblx0XHRkaWZmWCA9IHAxLnggLSBwMC54XG5cdFx0ZGlmZlkgPSBwMS55IC0gcDAueVxuXHRcdGFuZ2xlID0gMTgwIC8gTWF0aC5QSSAqIE1hdGguYXRhbjIgZGlmZlkgLCBkaWZmWFxuXG5cdFx0eCA9IHAwLnhcblx0XHR5ID0gcDAueVxuXG5cdFx0XCJ0cmFuc2xhdGUoI3t4fSwje3l9KSByb3RhdGUoI3thbmdsZX0pXCJcblxuXHRjbGljazogLT4gaWYgQHBhdXNlZCB0aGVuIEBwbGF5KCkgZWxzZSBAcGF1c2UoKVxuXHRwYXVzZTotPiBAcGF1c2VkID0gdHJ1ZVxuXHRwbGF5OiAtPlxuXHRcdEBwYXVzZSgpXG5cdFx0ZDMudGltZXIuZmx1c2goKVxuXHRcdEBwYXVzZWQgPSBmYWxzZVxuXHRcdGxhc3QgPSAwXG5cdFx0ZDMudGltZXIgKGVsYXBzZWQpPT5cblx0XHRcdGR0ID0gZWxhcHNlZCAtIGxhc3Rcblx0XHRcdEBjYXJzLmZvckVhY2ggKGNhciktPlxuXHRcdFx0XHRjYXIubW92ZSBkdFxuXHRcdFx0QHNjb3BlLiRldmFsQXN5bmMoKVxuXHRcdFx0bGFzdCA9IGVsYXBzZWRcblx0XHRcdEBwYXVzZWRcblx0XHRcdFxudmlzRGVyID0gLT5cblx0ZGlyZWN0aXZlID0gXG5cdFx0c2NvcGU6IHt9XG5cdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0dGVtcGxhdGVVcmw6ICcuL3N0eWxlcy90b3duLnN2Zydcblx0XHRjb250cm9sbGVyOiBbJyRzY29wZScsICckZWxlbWVudCcsIEN0cmxdXG5cbmFuZ3VsYXIubW9kdWxlICdtYWluQXBwJyAsIFtdXG5cdC5kaXJlY3RpdmUgJ3Zpc0RlcicsIHZpc0RlclxuXG4iXX0=

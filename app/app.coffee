angular = require 'angular'
d3 = require 'd3'
_ = require 'lodash'

class Car
	constructor: (@loc)->
		@id = _.uniqueId()
		@vel = .1
		#loc is a percentage around the circle
	move: (dt)->
		@loc = (@loc + @vel * dt / 1000)%1

class Ctrl
	constructor: (@scope, el)->
		# MAKE CARS
		@cars = _.range 0 , 20
			.map (n)->
				#INITIAL LOCATION
				loc = n / 20
				new Car loc

		@road = d3.select el[0]
			.select '#greyRoad'
			.node()

		@road_length = @road.getTotalLength()

	place_car: (car)->
		p0 = @road.getPointAtLength car.loc * @road_length
		p1 = @road.getPointAtLength (car.loc + .002)%1 *@road_length

		diffX = p1.x - p0.x
		diffY = p1.y - p0.y
		angle = 180 / Math.PI * Math.atan2 diffY , diffX

		x = p0.x
		y = p0.y

		"translate(#{x},#{y}) rotate(#{angle})"

	click: -> if @paused then @play() else @pause()
	pause:-> @paused = true
	play: ->
		@pause()
		d3.timer.flush()
		@paused = false
		last = 0
		d3.timer (elapsed)=>
			dt = elapsed - last
			@cars.forEach (car)->
				car.move dt
			@scope.$evalAsync()
			last = elapsed
			@paused
			
visDer = ->
	directive = 
		scope: {}
		controllerAs: 'vm'
		templateUrl: './styles/town.svg'
		controller: ['$scope', '$element', Ctrl]

angular.module 'mainApp' , []
	.directive 'visDer', visDer


import React, { useEffect } from 'react'
import {addNoteRequest, dropCollectionRequest} from '../requests'

function Demo({history}) {

	useEffect(() => {		
		(async () => {
			await dropCollectionRequest()
			await Promise.all(demo.map(note => {
				return addNoteRequest(note)
			}))
			history.push('/')
		})()
	})

	return <div>Adding notes for Demo...</div>
}

export default Demo

const demo = [
	{title: 'Trip to europe', text: 'Get vaccinated<br>Get travel size sunscreen and moisturizer<br>Buy suitcases and a new backpack'},
	{title: 'TODO', text: 'Buy groceries<br>do homework<br>take the dog out for a walk<br>Check mail<br>Laundry<br>Buy printer<br>Throw out couch'},
	{title: 'How to make Baked Ziti', text: 'Bring a large pot of lightly salted water to a boil. Add ziti pasta, and cook until al dente, about 8 minutes; drain. In a large skillet, brown onion and ground beef over medium heat. Add spaghetti sauce, and simmer 15 minutes.Preheat the oven to 350 degrees F (175 degrees C). Butter a 9x13 inch baking dish. Layer as follows: 1/2 of the ziti, Provolone cheese, sour cream, 1/2 sauce mixture, remaining ziti, mozzarella cheese and remaining sauce mixture. Top with grated Parmesan cheese. Bake for 30 minutes in the preheated oven, or until cheeses are melted.'},
	{title: 'Job applications', text: 'Google<br>Yahoo<br>Airbnb<br>Uber<br>Doordash<br>Bloomberg<br>Peloton<br>Greenhouse<br>Facebook'},
	{title: 'Gym Routine', text: 'Bench press 5x5<br>Squats 5x5<br>Deadlift 5x5<br>Pull ups 3x10<br>Chest Press 3x10<br>Rows 3x10'},
	{title: '2019 Goals', text: 'Get into shape<br>Improve ability to make decisions<br>Stop wasting time on social media<br>Start eating healthy'},
	{title: 'Ideal Laptop', text: 'Needs ssd<br>Atleast 8gb ram<br>Quad core<br>Dedicated gpu'},
	{title: 'Favorite restaurants', text: 'Rasa<br>Planet Hollywood<br>Vapianos<br>Eagle Steakhouse<br>Peri Peri Grill House'},
	{title: 'Books', text: 'Flowers for Algernon<br>Of mice and men<br>A thousand splendid suns<br>Kite runner<br>Persepolis<br>Bright sided'},
	{title: 'Brands to checkout', text: 'American Eagle<br>J Crew<br>Gap<br>Old Navy<br>Diesel<br>Gucci'},
	{title: 'Cs resources', text: 'Udacity<br>Cybrary<br>Udemy<br>Coursera<br>Edx<br>Lynda<br>Pluralsight<br>Freecodecamp'},
	{title: 'Best things to do around the city', text: 'Ping pong<br>Boating at central park<br>Karoake<br>Handball<br>Laser tag<br>Cruise'},
	{title: 'phones to check out', text: 'Pixel 4<br>iPhone 11<br>Sony Experia<br>Samsung S10'},
	{title: 'Event', text: 'Dave\'s birthday next week friday<br>Brainstorm for the perfect gift'},
	{title: 'Css grid notes', text: 'grid-template-row: 25% 25% 25% 25%; // other units, em, px and fr<br>grid-template-column: 50% 50%; // fr is similar to flex and layout_weight<br>grid-column-start<br>grid-column-end<br>grid-row-start<br>grid-row-end<br>more attributes examples:<br>grid-column: 1 /1;<br><br>grid-column-start: 1;   grid-column-end: 4 span;<br><br>grid-area: 1 / 1 / 3/ 3;<br>order: 1 ; order is automatically 0 for all unless specified'},
]

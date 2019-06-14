import React, { Component } from 'react'
import Note from './components/Note'

const s = "hey are you ok , i was kinda just wonder if u wanted to do anything with me tonight "


export default class Test extends Component {
	render() {
		return (
			<div style={{display: 'flex', color: 'white'}}>
				{/* <div style={{display:'flex', flexDirection: 'column', background: 'red', margin: '2%'}}>
					<div style={{background: 'purple', margin: '0 auto'}}>hello here are some more words to increase height</div>
					<div style={{background: 'pink', margin: '0 auto'}}>hello</div>
					<div style={{background: 'yellow', margin: '0 auto'}}>hello</div>
				</div>
				<div style={{display:'flex', flexDirection: 'column', background: 'gray', margin: '2%'}}>
					<span style={{background: 'purple', margin: '0 auto'}}>hey</span>
					<span style={{background: 'pink', margin: '0 auto'}}>hey</span>
					<span style={{background: 'yellow', margin: '0 auto'}}>hey</span>
				</div>
				<div style={{display:'flex', flexDirection: 'column', background: 'green', margin: '2%'}}>
					<span style={{background: 'purple', margin: '0 auto'}}>cool</span>
					<span style={{background: 'pink', margin: '0 auto'}}>cool</span>
					<span style={{background: 'yellow', margin: '0 auto'}}>cool</span>
				</div> */}
				<div style={{display: 'flex', flexDirection: 'column', maxWidth: '300px'}}>
					<Note key={1} note={{title: 'hi man', text: s}} darkTheme={true}></Note>
					<Note key={2} note={{title: 'hi', text: s}} darkTheme={true}></Note>
					<Note key={11} note={{title: 'hi', text: s}} darkTheme={true}></Note>
					<Note key={3} note={{title: 'hi', text: s+s+s}} darkTheme={true}></Note>
				</div>
				<div style={{display: 'flex', flexDirection: 'column', maxWidth: '300px'}}>
					<Note key={23423} note={{title: 'hi', text: s}} darkTheme={true}></Note>
					<Note key={23} note={{title: 'hi', text: s}} darkTheme={true}></Note>
					<Note key={4} note={{title: 'hi', text: s}} darkTheme={true}></Note>
					<Note key={5} note={{title: 'hi', text: s+s}} darkTheme={true}></Note>
					<Note key={6} note={{title: 'hi', text: s}} darkTheme={true}></Note>
				</div>
				<div style={{display: 'flex', flexDirection: 'column', maxWidth: '300px'}}>
					<Note key={7} note={{title: 'hi', text: s}} darkTheme={true}></Note>
					<Note key={8} note={{title: 'hi', text: s+s}} darkTheme={true}></Note>
					<Note key={34} note={{title: 'hi', text: s+s+s}} darkTheme={true}></Note>
					<Note key={324} note={{title: 'hi', text: s+s+s}} darkTheme={true}></Note>
					<Note key={9} note={{title: 'hi', text: s+s+s}} darkTheme={true}></Note>
				</div>
			</div>
		)
	}
}

import * as React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from './Home'
import { BrowserRouter } from 'react-router-dom';


test('Home page renders welcome text', () => {
render(<BrowserRouter><Home/></BrowserRouter>)
expect(screen.getByText('Welcome to Human Limits!')).toBeInTheDocument()
})
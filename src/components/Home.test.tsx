import * as React from 'react';
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Home from './Home'
import { BrowserRouter } from 'react-router-dom';
import fireEvent from '@testing-library/user-event'

test('Home page renders welcome text', () => {
    render(<BrowserRouter><Home/></BrowserRouter>)
    expect(screen.getByText('Welcome to Human Limits!')).toBeInTheDocument()
})

test('Home page renders link to number memory game', () => {
    render(<BrowserRouter><Home/></BrowserRouter>)
    expect(screen.getByTestId('numberMemGame')).toBeInTheDocument()
})


test('Clicking the link to number memory game', () => {
    render(<BrowserRouter><Home/></BrowserRouter>)
    const link = screen.getByTestId('numberMemGame');
    fireEvent.click(link);
})


import React from 'react'
import ThemeProvider from '../theme'
import AppView from './app-view'

const Main = () => {
  return (
    <>
    <ThemeProvider>
        <AppView/>
    </ThemeProvider>
    </>
  )
}

export default Main
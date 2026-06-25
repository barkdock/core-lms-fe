import { createSlice } from '@reduxjs/toolkit'

const getStoredDarkMode = () => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('darkMode') === 'true'
}

const applyDarkMode = (enabled) => {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', enabled)
  localStorage.setItem('darkMode', String(enabled))
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    darkMode: getStoredDarkMode(),
    sidebarOpen: true,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      applyDarkMode(state.darkMode)
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebar: (state, action) => {
      state.sidebarOpen = action.payload
    },
  },
})

export const { toggleDarkMode, toggleSidebar, setSidebar } = uiSlice.actions
export default uiSlice.reducer

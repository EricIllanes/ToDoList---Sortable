/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        // 'homebackground': "url('https://images.unsplash.com/photo-1602520000000-8b9b9b9b9b9b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')",
        'homebackground':"url('../src/assets/homebackground.jpg')",
      },
      colors: {
      loginbg:'#123360'
    }
    },
  },
  plugins: [],
}
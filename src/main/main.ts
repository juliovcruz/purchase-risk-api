import app from './routes-config/app'
const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})
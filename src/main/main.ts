import app from './config/app'
const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
  console.log(`For use the api, send POST in http://localhost:${PORT}/risk`)
})

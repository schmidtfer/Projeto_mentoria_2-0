const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`Pet Daycare API running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`Health Check: http://localhost:${PORT}/health`);
  console.log(`========================================`);
  console.log('\nDefault credentials:');
  console.log('Worker - username: userWorker, password: worker123');
  console.log('Tutor - example: username: tutor_bisteca, password: 123456');
});

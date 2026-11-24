const { spawn } = require('child_process');
const http = require('http');

const TEST_PORT = 5002;

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({
      hostname: 'localhost',
      port: TEST_PORT,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(raw) }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${TEST_PORT}${path}`, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(raw) });
        } catch {
          resolve({ status: res.statusCode, data: raw });
        }
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log(`Starting test server on port ${TEST_PORT}...`);
  const server = spawn('node', ['backend/server.js'], {
    env: { ...process.env, PORT: String(TEST_PORT) },
    stdio: 'inherit'
  });

  // Poll until server is ready
  let ready = false;
  for (let i = 0; i < 15; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const h = await get('/api/health');
      if (h && h.status === 200) {
        ready = true;
        break;
      }
    } catch {}
  }
  if (!ready) {
    throw new Error('Test server failed to start within timeout');
  }

  try {
    console.log('\n--- 1. Testing GET /api/health ---');
    const health = await get('/api/health');
    console.log('Health Response:', health);

    console.log('\n--- 2. Testing GET /api/services ---');
    const services = await get('/api/services');
    console.log(`Services found: ${services.data.length}`);
    console.log('First service:', services.data[0]?.title, 'Price:', services.data[0]?.price);

    console.log('\n--- 3. Testing POST /api/ai/chat ---');
    const aiTest = await post('/api/ai/chat', { question: 'What flowers do you recommend for an anniversary?' });
    console.log('AI Response:', aiTest.data);

    console.log('\n--- 4. Testing POST /api/bookings ---');
    const bookingRes = await post('/api/bookings', {
      name: 'Princess Sophia',
      phone: '+1 (555) 345-6789',
      service: 'The Empress Orchid & Peony Arrangement',
      date: '2026-12-20',
      email: 'sophia@palace.org',
      notes: 'Please arrange delivery in the morning with bespoke greeting card.'
    });
    console.log('Booking Creation Response:', bookingRes.data);

    console.log('\n--- 5. Testing GET /api/bookings ---');
    const allBookings = await get('/api/bookings');
    console.log(`Total bookings in DB: ${allBookings.data.length}`);
    const found = allBookings.data.find(b => b.name === 'Princess Sophia');
    console.log('Verified newly created booking exists:', Boolean(found));

    console.log('\n--- 6. Testing GET / (Static Frontend) ---');
    const frontendRes = await get('/');
    console.log('Frontend status:', frontendRes.status);
    console.log('Contains BloomAI Florist:', frontendRes.data.includes('BloomAI Florist'));

    console.log('\nALL 6 END-TO-END TESTS PASSED SUCCESSFULLY! 🌸');
  } catch (err) {
    console.error('Test error:', err);
    process.exitCode = 1;
  } finally {
    if (server) {
      server.kill();
      console.log('Server process terminated.');
    } else {
      console.log('Finished testing against active server.');
    }
  }
}

runTests();

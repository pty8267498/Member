// mock 使用
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

var mock = new MockAdapter(axios);

mock.onGet('/api/login').reply(200, {
  code: 200,
  emsg: 'success',
  data: {
    username: 'admin',
    password: 'admin'
  }
})

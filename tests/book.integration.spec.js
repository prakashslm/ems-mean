import should from 'should';
import { agent } from 'supertest';
import { model } from 'mongoose';

const app = require('../app');

const Book = model('Book');
const requestAgent = agent(app);

describe('Book Crud Test', () => {
  it('allow a book to be posted and return read and _id', (done) => {
    const bookPost = { title: 'My Book', author: 'Prakash', genre: 'Fiction' };

    requestAgent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, result) => {
        // result.body.read.should.not.equal(false);
        result.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    //mongoose.connection.close();
    app.server.close(done());
  });

});

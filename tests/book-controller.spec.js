import { should } from 'should';
import { spy } from 'sinon';

import bookController from '../api/controllers/book-controller';

describe('BookController', () => {
  describe('user calls post api', () => {
    it('checks for title not to empty', () => {
      const Book = function (book) { this.save = () => { } }

      const req = {
        body: {
          author: 'Jon'
        }
      };

      const res = {
        status: spy(),
        send: spy(),
        json: spy()
      };

      const controller = bookController(Book);
      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});

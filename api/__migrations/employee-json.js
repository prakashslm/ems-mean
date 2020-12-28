export function insert(db) {
  db.employee.insert([
    {
      firstname: 'prakash',
      lastname: 'vivek',
      email: 'google@gmail.com',
      salary: 1550,
      dob: '20-16-1998',
      status: 'on'
    }
  ]);
}

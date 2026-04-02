const { expect } = require('chai');

describe('Basic Test Suite', () => {
  it('should return true', () => {
    expect(true).to.equal(true);
  });

  it('should add two numbers correctly', () => {
    const result = 2 + 3;
    expect(result).to.equal(5);
  });

  it('should check string equality', () => {
    const appName = 'Task Manager';
    expect(appName).to.equal('Task Manager');
  });

  it('should confirm an array has the correct length', () => {
    const tasks = ['task1', 'task2', 'task3'];
    expect(tasks).to.have.lengthOf(3);
  });

  it('should confirm an object has a required property', () => {
    const user = { name: 'Riya', role: 'student' };
    expect(user).to.have.property('name');
  });

  it('should check that a value is not null', () => {
    const dbStatus = 'connected';
    expect(dbStatus).to.not.equal(null);
  });
it('should subtract two numbers correctly', function() {
  const result = 5 - 3;
  if (result !== 2) throw new Error('Subtraction failed');
});

it('should multiply two numbers correctly', function() {
  const result = 4 * 3;
  if (result !== 12) throw new Error('Multiplication failed');
});

it('should check if a string contains a substring', function() {
  const str = "hello world";
  if (!str.includes("world")) throw new Error('Substring not found');
});

it('should verify an array includes a value', function() {
  const arr = [1, 2, 3];
  if (!arr.includes(2)) throw new Error('Array does not include value');
});
});

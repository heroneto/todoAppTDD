const { describe, it, before, afterEach } = require('mocha')
const { expect } = require('chai')
const TodoRepository = require('../src/todoRepository')
const { createSandbox } = require('sinon')

describe('todoRepository', () => {
  let todoRepository
  let sandbox
  before(() => {
    todoRepository = new TodoRepository()
    sandbox = createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('methods signature', () => {
    it('Should call list from lokijs', () => {
      const mockdatabase = [
        {
          name: 'Joãozinho',
          age: 90,
          meta: { revision: 0, created: 1611187896602, version: 0 },
          '$loki': 1
        },
      ]

      const functionName = "find"
      const expectedReturn = mockdatabase

      sandbox.stub(
        todoRepository.schedule,
        functionName
      ).returns(expectedReturn)

      const result = todoRepository.list()
      expect(result).to.be.deep.equal(expectedReturn)
      expect(todoRepository.schedule[functionName].calledOnce).to.be.ok
    })
    it('Should call insertOne from lokijs', () => {
      const functionName = "insertOne"
      const expectedReturn = true

      const data = {
        name: "Heron"
      }

      sandbox.stub(
        todoRepository.schedule,
        functionName
      ).returns(expectedReturn)

      const result = todoRepository.create(data)
      expect(result).to.be.ok
      expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok
    })
  })
})







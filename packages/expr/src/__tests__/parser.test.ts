import { Parser } from '../parser';
import { AST } from '../ast';

describe('Parser', () => {
  it('should parse numbers', () => {
    const parser = new Parser('123');
    expect(parser.parse()).toEqual(AST.createNumber(123));
  });

  it('should parse simple expressions', () => {
    const parser = new Parser('2 + 3');
    expect(parser.parse()).toEqual(
      AST.createBinaryOp('+', AST.createNumber(2), AST.createNumber(3))
    );
  });

  it('should parse nested expressions', () => {
    const parser = new Parser('2 * (3 + 4)');
    expect(parser.parse()).toEqual(
      AST.createBinaryOp(
        '*',
        AST.createNumber(2),
        AST.createBinaryOp('+', AST.createNumber(3), AST.createNumber(4))
      )
    );
  });

  it('should parse identifiers', () => {
    const parser = new Parser('x');
    expect(parser.parse()).toEqual(AST.createIdentifier('x'));
  });

  it('should parse nested properties', () => {
    const parser = new Parser('foo.bar.baz');
    expect(parser.parse()).toEqual(AST.createIdentifier('foo.bar.baz'));
  });

  it('should parse complex expressions with identifiers', () => {
    const parser = new Parser('x * (y + z.value)');
    expect(parser.parse()).toEqual(
      AST.createBinaryOp(
        '*',
        AST.createIdentifier('x'),
        AST.createBinaryOp('+', AST.createIdentifier('y'), AST.createIdentifier('z.value'))
      )
    );
  });

  it('should throw error for invalid syntax', () => {
    const parser = new Parser('2 +');
    expect(() => parser.parse()).toThrow();
  });
}); 
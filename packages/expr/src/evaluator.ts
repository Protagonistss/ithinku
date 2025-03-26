import { ASTNode } from './ast';

export type Context = {
  [key: string]: number | Context;
};

export class Evaluator {
  private context: Context;

  constructor(context: Context = {}) {
    this.context = context;
  }

  private resolveValue(obj: Context, path: string[]): number {
    let current: number | Context = obj[path[0]];
    if (current === undefined) {
      throw new Error(`Undefined variable: ${path[0]}`);
    }

    for (let i = 1; i < path.length; i++) {
      if (typeof current === 'number') {
        throw new Error(`Cannot access property ${path[i]} of number`);
      }
      current = current[path[i]];
      if (current === undefined) {
        throw new Error(`Undefined variable: ${path.slice(0, i + 1).join('.')}`);
      }
    }

    if (typeof current !== 'number') {
      throw new Error(`Expected number but got object at ${path.join('.')}`);
    }
    return current;
  }

  public evaluate(node: ASTNode): number {
    switch (node.type) {
      case 'number':
        return node.value;

      case 'identifier':
        const parts = node.name.split('.');
        return this.resolveValue(this.context, parts);

      case 'binary':
        const left = this.evaluate(node.left);
        const right = this.evaluate(node.right);

        switch (node.operator) {
          case '+': return left + right;
          case '-': return left - right;
          case '*': return left * right;
          case '/':
            if (right === 0) throw new Error('Division by zero');
            return left / right;
          default:
            throw new Error(`Unknown operator: ${node.operator}`);
        }

      default:
        throw new Error(`Unknown node type: ${(node as any).type}`);
    }
  }

  public setVariable(name: string, value: number | Context): void {
    const parts = name.split('.');
    let current = this.context;
    
    for (let i = 0; i < parts.length - 1; i++) {
      if (!(parts[i] in current) || typeof current[parts[i]] === 'number') {
        current[parts[i]] = {};
      }
      current = current[parts[i]] as Context;
    }
    
    current[parts[parts.length - 1]] = value;
  }

  public getVariable(name: string): number {
    return this.resolveValue(this.context, name.split('.'));
  }
} 
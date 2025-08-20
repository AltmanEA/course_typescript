function final<This, Args extends any[], Return>(
    value: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
        This,
        (this: This, ...args: Args) => Return
    >
): (this: This, ...args: Args) => Return {
    
    const methodName = String(context.name);
    
    return function (this: This, ...args: Args): Return {
        // Приводим this к any для доступа к constructor
        const self = this as any;
        
        if (self.constructor !== context.metadata?.originalConstructor) {
            throw new Error(
                `Метод '${methodName}' запрещено переопределять`
            );
        }
        return value.apply(this, args);
    };
}

export class PaymentSystem {
    // Этот метод нельзя переопределять
    @final
    processTransaction(amount: number): string {
        console.log(`Обработка транзакции на сумму ${amount}`);
        return `Транзакция ${amount} успешна`;
    }
    
    // Этот метод можно переопределять
    getCommission(): number {
        return 0.02; // 2%
    }
}

export class PayPal extends PaymentSystem {
    // ✅ Можно переопределить обычный метод
    getCommission(): number {
        return 0.03; // 3%
    }
    
    // ❌ Попытка переопределить финальный метод
    processTransaction(amount: number): string {
        console.log("Попытка обойти систему...");
        return super.processTransaction(amount);
    }
}
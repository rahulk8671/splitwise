class Operator {
    constructor(friends) {
        this.people = {}
        friends.forEach(fr => {
            this.people[fr] = new Person(friends.filter(item => item !== fr))
        })
    }
    
    split(money, spender) {
        const eachPersonOwns = this.people[spender].spend(money)
        for (let key in this.people) {
            if (key !== spender) {
                this.people[key].borrow(eachPersonOwns, spender)
            }
        }
    }
    
    getSplitWise(name) {
        return {
            collect: this.people[name].toBeCollected,
            borrow: this.people[name].borrowed
        }
    }
}

class Person {
    constructor(friends) {
        this.total = friends.length
        this.borrowed = {}
        this.toBeCollected = {}
        
        friends.forEach(fr => {
            this.borrowed[fr] = 0
            this.toBeCollected[fr] = 0
        })
    }
    
    spend(money) {
        let eachPersonOwns = money / (this.total + 1)
        for (let key in this.toBeCollected) {
            this.toBeCollected[key] += eachPersonOwns
        }
        this.validate()
        return eachPersonOwns
    }
    
    borrow(money, lendingFriend) {
        this.borrowed[lendingFriend] += money
        this.validate()
    }
    
    validate() {
        for (let key in this.toBeCollected) {
            if (this.toBeCollected[key] > this.borrowed[key]) {
                this.toBeCollected[key] = this.toBeCollected[key] - this.borrowed[key]
                this.borrowed[key] = 0 
            } else {
                this.borrowed[key] = this.borrowed[key] - this.toBeCollected[key]
                this.toBeCollected[key] = 0
            }
        }
    }
}

let op = new Operator(['a', 'b', 'c'])

op.split(150, 'a')

console.log('a split wise say => ',op.getSplitWise('a'))
console.log('b split wise say => ',op.getSplitWise('b'))
console.log('c split wise say => ',op.getSplitWise('c'))
console.log('-------------------------------------')
op.split(60, 'b')

console.log('a split wise say => ',op.getSplitWise('a'))
console.log('b split wise say => ',op.getSplitWise('b'))
console.log('c split wise say => ',op.getSplitWise('c'))
console.log('-------------------------------------')

op.split(90, 'b')

console.log('a split wise say => ',op.getSplitWise('a'))
console.log('b split wise say => ',op.getSplitWise('b'))
console.log('c split wise say => ',op.getSplitWise('c'))
console.log('-------------------------------------')

op.split(150, 'c')

console.log('a split wise say => ',op.getSplitWise('a'))
console.log('b split wise say => ',op.getSplitWise('b'))
console.log('c split wise say => ',op.getSplitWise('c'))
console.log('-------------------------------------')


/* ........................................ this ................................................ */

/* ....... this 参数

        this 参数是个假参数，它出现在参数列表的最前面
*/
    function f(this: void) {
        /*  this: void 表明此函数内部不需要 this类型 
            can't use this here because it's of type void! */
    }

    // 例子
    interface Card {
        suit: string;
        card: number;
    }
    interface Deck {
        suits: string[];
        cards: number[];
        createCardPicker(this: Deck): () => Card;
    }

    const deck: Deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        createCardPicker: function(this: Deck) {
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);

                return {suit: this.suits[pickedSuit], card: pickedCard % 13}; 
            }
        }
    }

    const cardPicker = deck.createCardPicker();
    const pickedCard = cardPicker();

    console.log(`card: ${pickedCard.card} of ${pickedCard.suit}`)       // card: 11 of hearts

    /*  现在TypeScript知道createCardPicker期望在某个Deck对象上调用。 也就是说 this是Deck类型的，
    而非any，因此--noImplicitThis不会报错了。   */

/* ....................................... this 参数在回调函数里 ........................................

*/
    class Handler {
        info:string = '';
        onClickBad(this: Handler, e:Event) {
            // ...
        }
    }
    let h = new Handler();
    // uiElement.addClickListener(h.onClickBad); // error!

    /*  指定了this类型后，你显式声明onClickBad必须在Handler的实例上调用。 然后TypeScript会检测到
    addClickListener要求函数带有this: void。 改变 this类型来修复这个错误： */

    class Handler1 {
        info: string = '';
        onClickGood(this: void, e: Event) {
            // can't use this here because it's of type void!
        }
    }

    let h1 = new Handler();
    // uiElement.addClickListener(h1.onClickGood);
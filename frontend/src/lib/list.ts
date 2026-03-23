
class ListNode{
   data:Record<string,any>
   prev:ListNode|null
   next:ListNode | null
   constructor(
      data:Record<string,any>,
      prev?:ListNode,
      next?:ListNode
   ){
      this.data = data
      this.prev = prev || null
      this.next = next || null
   }
}

class List{
   firstNode:ListNode | null
   lastNode:ListNode | null
   length:number

   constructor(
      node?:ListNode
   ){
      this.firstNode = this.lastNode = node || null
      this.length = node ? 1 : 0
   }

   addfront(node:ListNode){
      if(!this.firstNode){
         this.firstNode = node
         this.lastNode = node
         this.length = 1
      }else{
         this.firstNode.prev = node
         node.next=this.firstNode
         this.firstNode = node
         this.length += 1
      }
   }

   addback(node:ListNode){
      if(!this.lastNode){
         this.firstNode = node
         this.lastNode = node
         this.length = 1
      }else{
         this.lastNode.next = node
         node.prev=this.lastNode
         this.lastNode = node
         this.length += 1
      }
   }

   removefront():ListNode|null{
      if(!this.firstNode) return null
      if(this.firstNode===this.lastNode){
         this.length = 0
         const node = this.firstNode
         node.prev = node.next = null
         this.firstNode = null
         this.lastNode = null
         return node
      }else{
         const node = this.firstNode
         this.firstNode = this.firstNode.next
         if(this.firstNode) this.firstNode.prev = null
         this.length -= 1
         node.prev = node.next = null
         return node
      }
   }

   removeback():ListNode|null{
      if(!this.lastNode) return null
      if(this.firstNode===this.lastNode){
         this.length = 0
         const node = this.lastNode
         node.prev = node.next = null
         this.firstNode = null
         this.lastNode = null
         return node
      }else{
         const node = this.lastNode
         this.lastNode = this.lastNode.prev
         if(this.lastNode) this.lastNode.next = null
         this.length -= 1
         node.prev = node.next = null
         return node
      }
   }

   addNth(idx: number, node: ListNode) {
      if (idx < 0 || idx > this.length) {
         throw new Error("list index out of bound")
      }

      if (idx === 0) {
         this.addfront(node)
         return
      }

      if (idx === this.length) {
         this.addback(node)
         return
      }

      let curr = this.firstNode
      let i = 0

      while (i < idx && curr) {
         curr = curr.next
         i++
      }

      const prev = curr!.prev

      prev!.next = node
      node.prev = prev

      node.next = curr
      curr!.prev = node

      this.length++
   }

   removeNth(idx: number) {
      if (idx < 0 || idx >= this.length) {
         throw new Error("list index out of bound")
      }

      if (idx === 0) return this.removefront()
      if (idx === this.length - 1) return this.removeback()

      let node = this.firstNode
      let i = 0

      while (i < idx && node) {
         node = node.next
         i++
      }

      const prev = node!.prev
      const next = node!.next

      if (prev) prev.next = next
      if (next) next.prev = prev

      node!.prev = node!.next = null

      this.length--

      return node
   }

   empty():boolean{
      return this.length===0
   }

   at(idx:number):ListNode | null{
      if(idx<0 || idx>=this.length){
         throw new Error("list index out of bounds")   
      }

      let node = this.firstNode
      let i=0
      while(node && i<idx){
         node = node.next
         i++
      }
      return node
   }
   
   find(cb:(node:ListNode)=>boolean):ListNode[]{
      const ret:ListNode[] = []
      let node = this.firstNode
      while(node){
         if(cb(node)) ret.push(node)
         node = node.next
      }
      return ret
   }

   sort(cb:(node:ListNode)=>number){
      function merge(l1:ListNode, l2:ListNode){
         let left:ListNode|null = l1
         let right:ListNode|null = l2
         let _node:ListNode|null = null
         if(cb(left) < cb(right)){
            _node = left
            left = left.next
         }else{
            _node = right
            right = right.next
         }
         const f = _node
         while(left && right){
            if(cb(left) < cb(right)){
               _node.next = left
               left = left.next
            }else{
               _node.next = right
               right = right.next
            }
            _node = _node.next
         }

         let rest = (left) ? left : right
         while(rest){
            _node!.next = rest
            _node = _node.next
            rest = rest.next
         }

         _node.next = null
         f.prev = null
         let prev = f
         let curr = f.next
         while(curr){
            curr.prev = prev
            prev = curr
            curr = curr.next
         }
         return f
      }

      function sol(head:ListNode, len:number):ListNode{
         if(len <= 1) return head

         const leftLen = Math.floor(len / 2)
         let prev:ListNode|null = null
         let curr:ListNode|null = head

         let idx = 0
         while(idx < leftLen){
            prev = curr
            curr = curr!.next
            idx++
         }

         if(prev) prev.next = null;

         let l = sol(head, leftLen);
         let r = sol(curr!, len - leftLen);

         return merge(l, r);
      }

      if(!this.firstNode) return
      
      const newHead = sol(this.firstNode, this.length)

      this.firstNode = newHead

      let temp = newHead
      while(temp.next) temp = temp.next
      this.lastNode = temp
   }
}

export {ListNode, List}
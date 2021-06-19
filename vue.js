var list = [{
    priority:1,
    title:"Fix bootstrap issues",
    date:"2021-06-21",
    checked:false
},{
    priority:1,
    title:"Make Mobile Friendly",
    date:"2021-06-21",
    checked:true
},{
    priority:3,
    title:"Add Readme.md",
    date:"2021-06-19",
    checked:true
}];

Vue.component("todo-item",{
    props:['item', 'index'],
    template:`
        <div class="todo-item my-1 py-2 px-1">
            <div class="row">
                <div class="col-2 my-auto">
                    <div class="check-box float-end">
                        <input type="checkbox" class="checkbox-round" @change="$emit('toggle-check', index)" :checked="item.checked">
                    </div>
                </div>
                <div class="col-8">
                    <div class="todo-title">
                        <strike @click="$emit('toggle-check', index)" v-if="item.checked">{{item.title}}</strike>
                        <span @click="$emit('toggle-check', index)" v-if="!item.checked">{{item.title}}</span>        
                    </div>
                    <span class="todo-date">{{item.date}}</span>
                    <span class="delete-button" @click="$emit('del', index)">
                        <i class="fa fa-times"></i>
                    </span> 
                </div>
                <div class="col-2 priority my-auto">
                    {{item.priority}}
                </div>
            </div> 
        </div>
    `
});

var app = new Vue({
    el:"#app",
    data:{
        todos:[],
        newTitle:"",
        newDate:"",
        newPriority:4,
        sortByPriorityFlag:true
    },
    mounted() {
        if (localStorage.getItem('todoList')) {
            try {
              this.todos = JSON.parse(localStorage.getItem('todoList'));
            } catch(e) {
              localStorage.removeItem('todoList');
              this.todos = list;
            }
        }else{
            this.todos = list;
        }
    },
    methods:{
        addTodo: function(){
            var newTodo = {
                priority:this.newPriority,
                title:this.newTitle,
                date:this.newDate,
                checked:false
            }
            this.todos.push(newTodo);
            this.saveTodos();
            this.newTitle = "";
            this.newDate = "";
            this.newPriority = 4;

            this.sortList();
        },
        saveTodos: function(){
            var parsed = JSON.stringify(this.todos);
            localStorage.setItem('todoList', parsed);
        },
        toggleCheck: function(index){
            this.todos[index].checked = !this.todos[index].checked;
            this.sortList();
            this.saveTodos();
        },
        del: function(index){
            this.todos.splice(index, 1);
            this.saveTodos();
        },
        sortList: function(){
            this.sortByPriorityFlag ? this.sortByPriority() : this.sortByDate();
            this.saveTodos();
        },
        sortByPriority: function(){
            this.todos.sort(function(a, b){
                if(a.checked == b.checked){
                    return a.priority == b.priority ? compareDates(a.date, b.date) : a.priority - b.priority;
                }else{
                    return !a.checked?-1:1;
                }
            });
        },
        sortByDate: function(){
            this.sortByPriorityFlag = false;
            this.todos.sort(function(a, b){
                if(a.checked == b.checked){
                    return compareDates(a.date, b.date) == 0 ? a.priority - b.priority : compareDates(a.date, b.date);
                }else{
                    return !a.checked?-1:1;
                }
            });
        },
        clearTodos: function(){
            this.todos = [];
            this.saveTodos();
        }
    }
});

function compareDates(a, b){
    var year_a = a.substring(0,4);
    var year_b = b.substring(0,4);

    if(year_a === year_b){
        var month_a = a.substring(5,7);
        var month_b = b.substring(5,7);

        if(month_a === month_b){
            var date_a = a.substring(8);
            var date_b = b.substring(8);

            if(date_a === date_b){
                return 0;
            }else{
                return date_a - date_b;
            }
        }else{
            return month_a - month_b;
        }
    }else{
        return year_a - year_b;
    }
}

var list = [{
    priority:1,
    title:"Make Mobile Friendly",
    date:"2021-06-21",
    checked:false
},{
    priority:3,
    title:"Add Readme.md",
    date:"2021-06-19",
    checked:true
}];

Vue.component("todo-item",{
    props:['item', 'index'],
    template:`
        <div class="row my-1"> 
            <div class="col-1">{{item.priority}}</div>      
            <div class="col-3"><a href="#">
                <strike @click="$emit('toggle-check', index)" v-if="item.checked">{{item.title}}</strike>
                <span @click="$emit('toggle-check', index)" v-if="!item.checked">{{item.title}}</span>
            </a></div>
            <div class="col-1"></div>
            <div class="col-3">{{item.date}}</div>
            <div class="col-1"> 
                <button @click="$emit('del', index)" class="btn btn-light btn-sm">
                    <i class="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    `
});

var app = new Vue({
    el:"#app",
    data:{
        todos: list,
        newTitle:"",
        newDate:"",
        newPriority:4
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
            this.newTitle = "";
            this.newDate = "";
            this.newPriority = 4;

            this.sortList();
        },
        toggleCheck: function(index){
            this.todos[index].checked = !this.todos[index].checked;
            this.sortList();
        },
        del: function(index){
            this.todos.splice(index, 1);
        },
        sortList: function(){
            this.todos.sort(function(a, b){
                if(a.checked == b.checked){
                    return a.priority == b.priority ? compareDates(a.date, b.date) : a.priority - b.priority;                   
                }else{
                    return !a.checked?-1:1;
                }
            });
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

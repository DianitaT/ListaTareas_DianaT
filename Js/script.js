const app = Vue.createApp({
  data() {
    return {
      newTask: '',
      tasks: [
        { text: 'Comprar comida', completed: false, counted: false },
        { text: 'Ir al centro', completed: false, counted: false },
        { text: 'Terminar tarea', completed: false, counted: false }
      ],
      progress: 0,
      totalCompletedTasks: 0 // Contador total de tareas completadas
    };
  },
  computed: {
    progressColor() {
      if (this.progress >= 71) return 'green';
      if (this.progress >= 41) return 'yellow';
      return 'red';
    },
    completedTasksCount() {
      return this.tasks.filter(task => task.completed).length;
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ text: this.newTask, completed: false, counted: false });
        this.newTask = '';
      }
    },
    toggleTask(index) {
      const task = this.tasks[index];
      task.completed = !task.completed;

      // Incrementa el contador solo si la tarea se marca como completada y no ha sido contada antes
      if (task.completed && !task.counted) {
        this.totalCompletedTasks += 1;
        task.counted = true;
      }
      // Decrementa el contador si la tarea se destacha (se marca como incompleta)
      else if (!task.completed && task.counted) {
        this.totalCompletedTasks -= 1;
        task.counted = false;
      }
    },
    removeTask(index) {
      // Simplemente elimina la tarea sin modificar `totalCompletedTasks`
      this.tasks.splice(index, 1);
    },
    increaseProgress() {
      if (this.progress < 100) {
        this.progress += 1;
      }
    },
    decreaseProgress() {
      if (this.progress > 0) {
        this.progress -= 1;
      }
    }
  }
});

app.mount('#app');

import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',
  props: {
    agenda: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul class="agenda">
      <li class="agenda__item" v-for="el in agenda" :key="el.id">
        <MeetupAgendaItem :agendaItem="el" />
      </li>
    </ul>`,
});

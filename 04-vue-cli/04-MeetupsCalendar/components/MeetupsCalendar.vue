<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" aria-label="Previous month" @click="prevMonth()"></button>
        <div class="calendar-view__date">{{ localDate }}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="nextMonth()"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div class="calendar-view__cell calendar-view__cell_inactive" tabindex="0" v-for="(el, index) in monthMonday">
        <div class="calendar-view__cell-day">{{ lastDayOfLastMonth() - firstDayOfMonth() + 1 + index }}</div>
        <div class="calendar-view__cell-content">
        </div>
      </div>
      <div class="calendar-view__cell" tabindex="0" v-for="elMonth in Object.keys(newMonthDay)">
        <div class="calendar-view__cell-day">{{ elMonth }}</div>
        <div class="calendar-view__cell-content">
          <a :href="`/meetups/${el.id}`" class="calendar-event" v-for="el in newMonthDay[elMonth]" >{{ el.title }}</a>
        </div>
      </div>
      <div class="calendar-view__cell calendar-view__cell_inactive" tabindex="0" v-for="(_, index) in monthSunday">
        <div class="calendar-view__cell-day">{{ index + 1 }}</div>
        <div class="calendar-view__cell-content">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      date: new Date(),
      newMonthDay: {}
    }
  },
  computed: {
    localDate() {
      //делаю объект с датами текущего месяца в формате timestamp
      let arrDate = {};
      for (let i=1; i<=this.lastDateOfMonth(); i++) {
        let a = new Date(Date.UTC(this.date.getUTCFullYear(), this.date.getUTCMonth(), i,0,
          0, 0)).getTime() / 1000;
        // let a = new Date(this.date.getFullYear(), this.date.getMonth(), i, 0, 0, 0).getTime() / 1000;
        arrDate[a] = i;
      }
      //прохожусь циклом по meetups и заношу митапы текущего месяца в массив (в виде объектов с датой)
      let newMeetupsDay = [];
      for (let obj of this.meetups) {
        let d = new Date(obj.date).getDate();
        let c = new Date(obj.date).setUTCHours(0, 0, 0);
        c =  new Date(c).getTime() / 1000;
        if (arrDate[c]) newMeetupsDay.push({d: d, obj: obj})
      }
      //перевожу массив митапов текущего месяца в объект с массивами
      let objMeetupsDay = {};
      for (let el of newMeetupsDay) {
        if (!objMeetupsDay[el.d]) objMeetupsDay[el.d] = [el.obj]
        else objMeetupsDay[el.d].push(el.obj)
      }
      //проверяю по каждому дню месяца наличие митапов и вывожу в окончательный объект
      this.newMonthDay = {};
      for (let day=1; day<=this.lastDateOfMonth(); day++) {
        if (objMeetupsDay[day]) this.newMonthDay[day] = objMeetupsDay[day]
        else this.newMonthDay[day] = null
      }
      return this.date.toLocaleDateString(navigator.language, {
        year: 'numeric',
        month: 'long',
      });
    },
    monthMonday() {
        return new Array(this.firstDayOfMonth())
    },
    monthSunday() {
      let dow = this.lastDayOfMonth();
      // if (this.lastDateOfMonth() === 28 && !this.firstDayOfMonth()) return new Array(7)
      // закрыть строку в воскресенье
      if ( dow === 0 ) {
        return null
      }
      // Если последний день месяца не воскресенье, показать первые дни следующего месяца
      else  {
        return new Array(7 - dow)
      }
    },
  },
  methods: {
    nextMonth() {
      // this.date = new Date(this.date.setDate(1));
      // this.date = new Date(this.date.setHours(0, 0, 0));
      // this.date = new Date(this.date.setMonth(this.date.getMonth() + 1));
      this.date = new Date(Date.UTC(this.date.getUTCFullYear(), this.date.getUTCMonth() + 1, 1, 0, 0, 0))
    },
    prevMonth() {
      // this.date = new Date(this.date.setDate(1));
      // this.date = new Date(this.date.setHours(0, 0, 0));
      // this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
      this.date = new Date(Date.UTC(this.date.getUTCFullYear(), this.date.getUTCMonth() - 1, 1, 0, 0, 0))
    },
    firstDayOfMonth() {
      return new Date(this.date.getFullYear(), this.date.getMonth(), 7).getDay()
    },
    lastDayOfMonth() {
      return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay()
    },
    lastDateOfMonth() {
      return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate()
    },
    lastDayOfLastMonth() {
      return this.date.getMonth() === 0 ? new Date(this.date.getFullYear() - 1, 11, 0).getDate() : new Date(this.date.getFullYear(), this.date.getMonth() , 0).getDate()
    },

  }
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>

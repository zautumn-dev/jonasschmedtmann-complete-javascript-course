// // 'use strict';

// // // Data needed for a later exercise
// // const flights =
// //   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// // const italianFoods = new Set([
// //   'pasta',
// //   'gnocchi',
// //   'tomatoes',
// //   'olive oil',
// //   'garlic',
// //   'basil',
// // ]);

// // const mexicanFoods = new Set([
// //   'tortillas',
// //   'beans',
// //   'rice',
// //   'tomatoes',
// //   'avocado',
// //   'garlic',
// // ]);

// // // Data needed for first part of the section
// // const restaurant = {
// //   name: 'Classico Italiano',
// //   location: 'Via Angelo Tavanti 23, Firenze, Italy',
// //   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
// //   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
// //   mainMenu: ['Pizza', 'Pasta', 'Risotto'],

// //   openingHours: {
// //     thu: {
// //       open: 12,
// //       close: 22,
// //     },
// //     fri: {
// //       open: 11,
// //       close: 23,
// //     },
// //     sat: {
// //       open: 0, // Open 24 hours
// //       close: 24,
// //     },
// //   },
// // };

// // const game = {
// //   team1: 'Bayern Munich',
// //   team2: 'Borrussia Dortmund',
// //   players: [
// //     [
// //       'Neuer',
// //       'Pavard',
// //       'Martinez',
// //       'Alaba',
// //       'Davies',
// //       'Kimmich',
// //       'Goretzka',
// //       'Coman',
// //       'Muller',
// //       'Gnarby',
// //       'Lewandowski',
// //     ],
// //     [
// //       'Burki',
// //       'Schulz',
// //       'Hummels',
// //       'Akanji',
// //       'Hakimi',
// //       'Weigl',
// //       'Witsel',
// //       'Hazard',
// //       'Brandt',
// //       'Sancho',
// //       'Gotze',
// //     ],
// //   ],
// //   score: '4:0',
// //   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
// //   date: 'Nov 9th, 2037',
// //   odds: {
// //     team1: 1.33,
// //     x: 3.25,
// //     team2: 6.5,
// //   },
// // };

// // ///////////////////////////////////////
// // // Coding Challenge #2

// // /*
// // Let's continue with our football betting app!

// // 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// // 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// // 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
// //       Odd of victory Bayern Munich: 1.33
// //       Odd of draw: 3.25
// //       Odd of victory Borrussia Dortmund: 6.5
// // Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

// // BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
// //       {
// //         Gnarby: 1,
// //         Hummels: 1,
// //         Lewandowski: 2
// //       }

// // GOOD LUCK 😀
// // */

// // /*
// // 让我们继续开发足球投注应用！

// // 1. 遍历 game.scored 数组，并将每个球员的名字和进球数打印到控制台（例如：“进球 1：莱万多夫斯基”）。

// // 2. 使用循环计算平均赔率并将其记录到控制台（我们已经学习过如何计算平均值，如果您不记得了，可以去查阅相关资料）。

// // 3. 将 3 个赔率以美观的格式打印到控制台，例如：

// // 拜仁慕尼黑胜赔：1.33

// // 平局赔率：3.25

// // 多特蒙德胜赔：6.5

// // 直接从游戏对象中获取球队名称，不要硬编码（“平局”除外）。提示：注意赔率和游戏对象的属性名称相同 😉

// // 附加题：创建一个名为“scorers”的对象，其中包含进球球员的姓名（作为属性）和进球数（作为值）。在这个游戏中，它看起来会是这样的：
// // */

// // for (const [index, name] of game.scored.entries()) {
// //   console.log(`进球 ${index}: ${name}`);
// // }
// ///////////////////////////////////////
// // Coding Challenge #3

// /*
// Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

// 1. Create an array 'events' of the different game events that happened (no duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
//       [FIRST HALF] 17: ⚽️ GOAL

// GOOD LUCK 😀
// */

// /*

// 让我们继续开发我们的足球投注应用！这次，我们有一个记录比赛期间事件的映射表。表中的值是事件本身，键是每个事件发生的分钟数（一场足球比赛有90分钟加上一些加时赛时间）。

// 1. 创建一个名为“events”的数组，用于存储比赛中发生的各种事件（不重复）。

// 2. 比赛结束后，我们发现第64分钟的黄牌判罚不公平。因此，从比赛事件日志中删除该事件。

// 3. 将以下字符串打印到控制台：“平均每9分钟发生一次事件”（请记住，一场比赛有90分钟）。

// 4. 遍历事件并将其记录到控制台，同时标记事件发生在比赛的上半场还是下半场（45分钟之后），如下所示：

// [上半场] 17: ⚽️ 进球

// */

// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// const events = new Set(gameEvents.values());

// gameEvents.delete(64);

// for (const [time, event] of gameEvents) {
//   console.log(`[${time > 45 ? '下' : '上'}半场] ${time}: ${event}`);
// }

// function padCard(number) {
//   return number.slice(-4).padStart(18, '*');
// }

// console.log(padCard('1111111111111111111111111111105X'));

const form = document.getElementById("time-form");
const list = document.getElementById("entries-list");
const chartCtx = document.getElementById("timeChart").getContext("2d");
const periodSelect = document.getElementById("period");
const exportBtn = document.getElementById("exportBtn");

let entries = JSON.parse(localStorage.getItem("entries")) || [];

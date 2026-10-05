"use strict";
const question = document.getElementById("question");
const answerArea = document.getElementById("answerArea");
const historyList = document.getElementById("historyList");
const nextButton = document.getElementById("nextButton");
const submitButton = document.getElementById("submitButton");
// コンフィグ
const maxNum = 3;
const letters = "abcdefghijklmnopqrstuvwxyz";
// 現在のお題
let currentQuestion = null;
/**
 * お題を生成.
 */
function generateQuestion() {
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    const let1 = letters[Math.floor(Math.random() * letters.length)];
    const let2 = letters[Math.floor(Math.random() * letters.length)];
    const newQuestion = {
        num1: num1,
        let1: let1,
        num2: num2,
        let2: let2,
        text: num1 + let1 + num2 + let2
    };
    currentQuestion = newQuestion;
    question.textContent = currentQuestion.text;
    createAnswerArea(currentQuestion);
}
/**
 * 回答欄を作る.
 *
 * @param num1 1つ目の数字
 * @param let1 1つ目のアルファベット
 * @param num2 2つ目の数字
 * @param let2 2つ目のアルファベット
 */
function createAnswerArea(question) {
    // 古い回答欄を削除
    answerArea.innerHTML = "";
    for (let i = 0; i < question.num1; i++) {
        addAnswerRow(question.let1);
    }
    for (let i = 0; i < question.num2; i++) {
        addAnswerRow(question.let2);
    }
}
/**
 * 回答欄を1つ作る.
 *
 * @param letter アルファベット
 */
function addAnswerRow(letter) {
    const row = document.createElement("div");
    row.className = "answer-row";
    const label = document.createElement("label");
    label.textContent = letter + ":";
    const input = document.createElement("input");
    input.type = "text";
    input.className = "answer-input";
    row.appendChild(label);
    row.appendChild(input);
    answerArea.appendChild(row);
}
/**
 * 回答ボタン押下.
 */
submitButton.addEventListener("click", () => {
    if (!currentQuestion)
        return;
    const inputs = answerArea.querySelectorAll(".answer-input");
    const answers = [];
    // 入力されたものだけ取得
    inputs.forEach((input) => {
        const value = input.value.trim();
        if (value !== "")
            answers.push(value);
    });
    if (answers.length === 0) {
        alert("回答を1つ以上入力してください。");
        return;
    }
    // 「まだ回答がありません」を削除
    const empty = historyList.querySelector(".empty");
    if (empty)
        empty.remove();
    // 履歴を作成
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.textContent =
        currentQuestion.text + ": " + answers.join(", ");
    // 新しい回答を上に追加
    historyList.prepend(historyItem);
    // 入力欄を空にする
    inputs.forEach((input) => {
        input.value = "";
    });
});
/**
 * 次のお題ボタンを押下.
 */
nextButton.addEventListener("click", () => {
    generateQuestion();
});
// 最初のお題を生成する
generateQuestion();

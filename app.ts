const question = document.getElementById("question") as HTMLElement;
const answerArea = document.getElementById("answerArea") as HTMLElement;
const historyList = document.getElementById("historyList") as HTMLElement;

const nextButton = document.getElementById("nextButton") as HTMLButtonElement;
const submitButton = document.getElementById("submitButton") as HTMLButtonElement;

// コンフィグ
const maxNum: number = 3;
const letters: string = "abcdefghijklmnopqrstuvwxyz";

type Question = {
    num1: number;
    let1: string;
    num2: number;
    let2: string;
    text: string;
};

// 現在のお題
let currentQuestion: Question | null = null;

/**
 * お題を生成.
 */
function generateQuestion(): void {
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    const let1 = letters[Math.floor(Math.random() * letters.length)];
    const let2 = letters[Math.floor(Math.random() * letters.length)];

    const newQuestion: Question = {
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
function createAnswerArea(
    question: Question
): void {
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
function addAnswerRow(letter: string): void {
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
    if (!currentQuestion) return;

    const inputs =
        answerArea.querySelectorAll<HTMLInputElement>(".answer-input");

    const answers: string[] = [];

    // 入力されたものだけ取得
    inputs.forEach((input) => {
        const value = input.value.trim();

        if (value !== "") answers.push(value);
    });

    if (answers.length === 0) {
        alert("回答を1つ以上入力してください。");
        return;
    }

    // 「まだ回答がありません」を削除
    const empty = historyList.querySelector(".empty");
    if (empty) empty.remove();

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
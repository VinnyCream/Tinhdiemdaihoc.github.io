document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const selection55Screen = document.getElementById('selection-55-screen');
    const calculatorScreen = document.getElementById('calculator-screen');
    const gpaIntroButton = document.getElementById('gpa-intro-btn');    
    const gpaSubjectCountScreen = document.getElementById('gpa-subject-count-screen');    
    const numSubjectsInput = document.getElementById('num-subjects');    
    const generateGpaInputsButton = document.getElementById('generate-gpa-inputs-btn');    
    const gpaCalculatorScreen = document.getElementById('gpa-calculator-screen');    
    const gpaInputsContainer = document.getElementById('gpa-inputs-container');    
    const calculateGpaButton = document.getElementById('calculate-gpa-btn');    
    const gpaResultDiv = document.getElementById('gpa-result');    
    const resetGpaButton = document.getElementById('reset-gpa-btn');    
    const backToGpaCountButton = document.getElementById('back-to-gpa-count-btn');    

    const introButtons = introScreen.querySelectorAll('.btn');
    const selection55Buttons = selection55Screen.querySelectorAll('.btn');

    const calculatorTitle = document.getElementById('calculator-title');
    const inputs55Standard = document.getElementById('inputs-55-standard');
    const inputs55235 = document.getElementById('inputs-55-235');
    const inputs46 = document.getElementById('inputs-46');
    const inputs37 = document.getElementById('inputs-37');

    const diemQuaTrinh55 = document.getElementById('diem-qua-trinh-55');
    const diemCuoiKy55 = document.getElementById('diem-cuoi-ky-55');

    const diemLyThuyet = document.getElementById('diem-ly-thuyet');
    const diemThucHanh = document.getElementById('diem-thuc-hanh');
    const diemCuoiKy235 = document.getElementById('diem-cuoi-ky-235');

    const diemQuaTrinh46 = document.getElementById('diem-qua-trinh-46');
    const diemCuoiKy46 = document.getElementById('diem-cuoi-ky-46');

    const diemQuaTrinh37 = document.getElementById('diem-qua-trinh-37');
    const diemCuoiKy37 = document.getElementById('diem-cuoi-ky-37');

    const calculateButton = calculatorScreen.querySelector('.calculate-btn');
    const resultDiv = document.getElementById('result');
    const resetButton = calculatorScreen.querySelector('.reset-btn');
    const backButtons = document.querySelectorAll('.back-btn');    

    let currentWeighting = null;    
    let numSubjects = 0;    

    function showScreen(screenToShow) {
        const screens = [introScreen, selection55Screen, calculatorScreen, gpaSubjectCountScreen, gpaCalculatorScreen];    
        screens.forEach(screen => {
            screen.style.display = 'none';
        });
        screenToShow.style.display = 'block';    
    }

    function setupCalculatorScreen(weightingType) {
        currentWeighting = weightingType;
        calculatorTitle.textContent = `Nhập Điểm - Hệ ${weightingType === '5:5-standard' ? 'Chuẩn 5:5' : weightingType === '5:5-235' ? '2:3:5' : weightingType}`;

        inputs55Standard.style.display = 'none';
        inputs55235.style.display = 'none';
        inputs46.style.display = 'none';
        inputs37.style.display = 'none';

        if (weightingType === '5:5-standard') {
            inputs55Standard.style.display = 'block';
        } else if (weightingType === '5:5-235') {
            inputs55235.style.display = 'block';
        } else if (weightingType === '4:6') {
            inputs46.style.display = 'block';
        } else if (weightingType === '3:7') {
            inputs37.style.display = 'block';
        }

        showScreen(calculatorScreen);
        resetCalculator();    
    }


    function resetCalculator() {
        const allInputs = calculatorScreen.querySelectorAll('input[type="number"]');
        allInputs.forEach(input => {
            input.value = '';
        });

        resultDiv.innerHTML = '';    
        resultDiv.className = 'result';    
        resultDiv.style.color = '';    
        resultDiv.style.backgroundColor = '';    
        resultDiv.style.border = '';    
    }


      function resetGpaCalculator() {
        gpaInputsContainer.innerHTML = ''; 
        gpaResultDiv.innerHTML = ''; 
        gpaResultDiv.className = 'result'; 
        gpaResultDiv.style.color = ''; 
        gpaResultDiv.style.backgroundColor = ''; 
        gpaResultDiv.style.border = ''; 
        numSubjectsInput.value = '1'; 
    }


    // Hàm convertToGrades đã được sửa
    function convertToGrades(score10) {
        let range10, score4, letter;

        if (score10 >= 9.5 && score10 <= 10) {
            range10 = '9.5 - 10';
            score4 = 4.0;
            letter = 'A+';
        } else if (score10 >= 8.5 && score10 < 9.5) { // Đã sửa: < 9.5 thay vì <= 9.4
            range10 = '8.5 - 9.4';
            score4 = 4.0;
            letter = 'A';
        } else if (score10 >= 8.0 && score10 < 8.5) { // Đã sửa: < 8.5 thay vì <= 8.4
            range10 = '8.0 - 8.4';
            score4 = 3.5;
            letter = 'B+';
        } else if (score10 >= 7.0 && score10 < 8.0) { // Đã sửa: < 8.0 thay vì <= 7.9
            range10 = '7.0 - 7.9';
            score4 = 3.0;
            letter = 'B';
        } else if (score10 >= 6.0 && score10 < 7.0) { // Đã sửa: < 7.0 thay vì <= 6.9
            range10 = '6.0 - 6.9';
            score4 = 2.5;
            letter = 'C+';
        } else if (score10 >= 5.5 && score10 < 6.0) { // Đã sửa: < 6.0 thay vì <= 5.9
            range10 = '5.5 - 5.9';
            score4 = 2.0;
            letter = 'C';
        } else if (score10 >= 5.0 && score10 < 5.5) { // Đã sửa: < 5.5 thay vì <= 5.4
            range10 = '5.0 - 5.4';
            score4 = 1.5;
            letter = 'D+';
        } else if (score10 >= 4.0 && score10 < 5.0) { // Đã sửa: < 5.0 thay vì <= 4.9
            range10 = '4.0 - 4.9';
            score4 = 1.0;
            letter = 'D';
        } else { // Mọi điểm dưới 4.0
            range10 = '0 - 3.9';
            score4 = 0;
            letter = 'F';
        }

        return { range10, score4, letter };
    }


    // --- Hàm tính điểm môn học phần ---
    function calculateScore() {
        let diemTong = 0;
        let inputsValid = true;

        const getAndValidateInput = (inputElement) => {
            const value = parseFloat(inputElement.value);
            
            if (isNaN(value) || value < parseFloat(inputElement.min) || value > parseFloat(inputElement.max)) {
                inputsValid = false;
                return null;
            }
            return value;
        };

        if (currentWeighting === '5:5-standard') {
            const diemQT = getAndValidateInput(diemQuaTrinh55);
            const diemCK = getAndValidateInput(diemCuoiKy55);
            if (inputsValid) {
                diemTong = (diemQT * 0.5) + (diemCK * 0.5);
            }
        } else if (currentWeighting === '5:5-235') {
            const diemLT = getAndValidateInput(diemLyThuyet);
            const diemTH = getAndValidateInput(diemThucHanh);
            const diemCK = getAndValidateInput(diemCuoiKy235);
              if (inputsValid) {
                diemTong = (diemLT * 0.2) + (diemTH * 0.3) + (diemCK * 0.5);
            }
        } else if (currentWeighting === '4:6') {
            const diemQT = getAndValidateInput(diemQuaTrinh46);
            const diemCK = getAndValidateInput(diemCuoiKy46);
              if (inputsValid) {
                diemTong = (diemQT * 0.4) + (diemCK * 0.6);
            }
        } else if (currentWeighting === '3:7') {
            const diemQT = getAndValidateInput(diemQuaTrinh37);
            const diemCK = getAndValidateInput(diemCuoiKy37);
              if (inputsValid) {
                diemTong = (diemQT * 0.3) + (diemCK * 0.7);
            }
        }


        // Hiển thị kết quả
        resultDiv.className = 'result'; // Reset class

        if (!inputsValid) {
            resultDiv.innerHTML = '<p style="color: red;">Vui lòng nhập điểm hợp lệ từ 0 đến 10 cho tất cả các trường.</p>'; // Dùng innerHTML
            resultDiv.classList.remove('dau', 'rot');    
              resultDiv.style.backgroundColor = '';    
              resultDiv.style.border = '';    
        } else {
            // Làm tròn điểm tổng đến 2 chữ số thập phân
            diemTong = Math.round(diemTong * 100) / 100;

            const grades = convertToGrades(diemTong);

            // Xác định trạng thái Qua môn / Rớt môn và màu sắc chữ
            const passStatusText = diemTong >= 4 ? '<span style="color: #155724; font-weight: bold;">Qua môn</span>' : '<span style="color: #721c24; font-weight: bold;">Rớt môn</span>';

            resultDiv.innerHTML = `
                <p><strong>Điểm Tổng: ${diemTong.toFixed(2)}</strong> - ${passStatusText}</p>
                <p><strong>Thang điểm 10:</strong> ${grades.range10}</p>
                <p><strong>Thang điểm 4:</strong> ${grades.score4.toFixed(1)}</p>
                <p><strong>Điểm Chữ:</strong> ${grades.letter}</p>
            `;

            if (diemTong < 4) { // Điều kiện rớt môn
                resultDiv.classList.add('rot');
                resultDiv.classList.remove('dau');
            } else { // Điều kiện qua môn
                resultDiv.classList.add('dau');
                resultDiv.classList.remove('rot');
            }

              resultDiv.style.color = '';    
        }
    }

    // --- Hàm tạo input cho GPA ---
    function generateGpaInputs(numberOfSubjects) {
        gpaInputsContainer.innerHTML = '';    
        if (numberOfSubjects <= 0) return;    

        for (let i = 1; i <= numberOfSubjects; i++) {
            const subjectDiv = document.createElement('div');
            subjectDiv.classList.add('gpa-subject-inputs');    

            subjectDiv.innerHTML = `
                <label>Môn ${i}:</label>
                <input type="number" class="score-input" placeholder="Nhập Điểm Thang 4 (0-4)" min="0" max="4" step="0.1" data-subject="${i}" required>
                <input type="number" class="credit-input" placeholder="Số Tín" min="1" step="0.5" data-subject="${i}" required>
            `;
            gpaInputsContainer.appendChild(subjectDiv);
        }
    }

    function calculateGpa() {
        const scoreInputs = gpaInputsContainer.querySelectorAll('.score-input');
        const creditInputs = gpaInputsContainer.querySelectorAll('.credit-input');

        let totalScoreCreditsSum = 0;    
        let totalCreditsSum = 0;    
        let passedScoreCreditsSum = 0;    
        let passedCreditsSum = 0;    
        let totalPassedCredits = 0;    
        let totalFailedCredits = 0;    
        let allInputsFilled = true;    

        for (let i = 0; i < scoreInputs.length; i++) {
            const score = parseFloat(scoreInputs[i].value);
            const credits = parseFloat(creditInputs[i].value);

            // Kiểm tra giá trị nhập vào cho điểm và tín chỉ
            if (isNaN(score) || score < 0 || score > 4 || isNaN(credits) || credits <= 0) {
                allInputsFilled = false;
                break;    
            }

            // Tính tổng cho Điểm trung bình học kỳ (GPA học kỳ)
            totalScoreCreditsSum += score * credits;
            totalCreditsSum += credits;

            if (score > 0) { 
                passedScoreCreditsSum += score * credits;
                passedCreditsSum += credits;
                totalPassedCredits += credits; // Cộng tín chỉ đạt
            } else {
                totalFailedCredits += credits; // Cộng tín chỉ không đạt (điểm 4 = 0)
            }
        }

        gpaResultDiv.className = 'result';    
        gpaResultDiv.style.color = '';    
        gpaResultDiv.style.backgroundColor = '';    
        gpaResultDiv.style.border = '';    

        if (!allInputsFilled) {
            gpaResultDiv.innerHTML = '<p style="color: red;">Vui lòng nhập điểm thang 4 (0-4) và tín chỉ hợp lệ (>0) cho tất cả các môn.</p>';
              gpaResultDiv.classList.remove('dau', 'rot');
        } else {
            // Tính Điểm trung bình học kỳ
            const semesterGpa = totalCreditsSum > 0 ? totalScoreCreditsSum / totalCreditsSum : 0;

            // Điểm trung bình tích lũy (chỉ cho học kỳ này và các môn đậu)
            const cumulativeGpa = passedCreditsSum > 0 ? passedScoreCreditsSum / passedCreditsSum : 0;


            // Làm tròn kết quả GPA đến 2 chữ số thập phân
            const roundedSemesterGpa = Math.round(semesterGpa * 100) / 100;
            const roundedCumulativeGpa = Math.round(cumulativeGpa * 100) / 100;

            // Xác định Xếp loại dựa trên Điểm trung bình học kỳ
            let ranking = '';
            if (roundedSemesterGpa >= 3.6) {
                ranking = 'Xuất sắc';
            } else if (roundedSemesterGpa >= 3.2) {
                ranking = 'Giỏi';
            } else if (roundedSemesterGpa >= 2.5) {
                ranking = 'Khá';
            } else if (roundedSemesterGpa >= 2.0) {
                ranking = 'Trung bình';
            } else if (roundedSemesterGpa >= 1.0) {
                ranking = 'Yếu';
            } else {
                ranking = 'Kém';
            }

            if (roundedSemesterGpa >= 2.5) { // Khá, Giỏi, Xuất sắc
                gpaResultDiv.classList.add('dau'); // Tái sử dụng class 'dau' cho nền xanh
                gpaResultDiv.classList.remove('rot');
                gpaResultDiv.style.backgroundColor = '#d4edda'; // Nền xanh nhạt
                gpaResultDiv.style.border = '1px solid #c3e6cb';
            } else if (roundedSemesterGpa >= 1.0) { // Trung bình, Yếu
                  gpaResultDiv.classList.remove('dau', 'rot');
                  gpaResultDiv.style.backgroundColor = '#fff3cd'; // Nền vàng nhạt
                  gpaResultDiv.style.border = '1px solid #ffeeba';
                  gpaResultDiv.style.color = '#856404'; // Chữ màu vàng đậm
            }
            else { // Kém
                gpaResultDiv.classList.add('rot'); // Tái sử dụng class 'rot' cho nền đỏ
                  gpaResultDiv.classList.remove('dau');
                  gpaResultDiv.style.backgroundColor = '#f8d7da'; // Nền đỏ nhạt
                  gpaResultDiv.style.border = '1px solid #f5c6cb';
            }
              // Đảm bảo màu chữ cho kết quả hiển thị rõ ràng trên nền
              if (gpaResultDiv.style.color === '') { // Nếu chưa đặt màu chữ (ví dụ ở nền vàng)
                  gpaResultDiv.style.color = 'black'; // Đặt màu chữ đen mặc định
              }


            // Hiển thị kết quả GPA
            gpaResultDiv.innerHTML = `
                <p><strong>Điểm trung bình học kỳ:</strong> ${roundedSemesterGpa.toFixed(2)}</p>
                <p><strong>Điểm trung bình tích lũy (Học kỳ này):</strong> ${roundedCumulativeGpa.toFixed(2)}</p>
                <p><strong>Số tín chỉ đạt:</strong> ${totalPassedCredits}</p>
                <p><strong>Số tín chỉ không đạt:</strong> ${totalFailedCredits}</p>
                <p><strong>Xếp loại:</strong> ${ranking}</p>
            `;
        }
    }

    introButtons.forEach(button => {
        // Loại bỏ nút GPA mới khỏi vòng lặp này
        if (button.id !== 'gpa-intro-btn') {
            button.addEventListener('click', () => {
                const weight = button.dataset.weight;
                if (weight === '5:5') {
                    showScreen(selection55Screen);
                } else {
                    setupCalculatorScreen(weight);
                }
            });
        }
    });

    selection55Buttons.forEach(button => {
        if (!button.classList.contains('back-btn')) {
            button.addEventListener('click', () => {
                const weight = button.dataset.weight;
                setupCalculatorScreen(weight);
            });
        }
    });

    // Nút Tính điểm môn học phần
    calculateButton.addEventListener('click', calculateScore);

    // Nút Reset điểm môn học phần
    resetButton.addEventListener('click', resetCalculator);

    // Nút mới: Tính GPA của học kỳ
    gpaIntroButton.addEventListener('click', () => {
        resetGpaCalculator(); 
        showScreen(gpaSubjectCountScreen); 
    });

    // Nút Tiếp theo (tạo input GPA)
    generateGpaInputsButton.addEventListener('click', () => {
        const enteredNumSubjects = parseInt(numSubjectsInput.value);
        if (isNaN(enteredNumSubjects) || enteredNumSubjects <= 0) {
            alert('Vui lòng nhập số lượng môn hợp lệ (lớn hơn 0).');
            numSubjectsInput.value = '1'; 
            return;
        }
        numSubjects = enteredNumSubjects; // Lưu lại số môn
        generateGpaInputs(numSubjects); 
        showScreen(gpaCalculatorScreen); 
    });

    // Nút Tính GPA
    calculateGpaButton.addEventListener('click', calculateGpa);

    // Nút Reset GPA
    resetGpaButton.addEventListener('click', () => {
        
        gpaInputsContainer.innerHTML = '';
        gpaResultDiv.innerHTML = '';
        gpaResultDiv.className = 'result';
        gpaResultDiv.style.color = '';
        gpaResultDiv.style.backgroundColor = '';
        gpaResultDiv.style.border = '';
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (gpaCalculatorScreen.style.display === 'block') {
                   resetGpaCalculator(); 
                   showScreen(gpaSubjectCountScreen);
            } else if (gpaSubjectCountScreen.style.display === 'block') {
                   resetGpaCalculator(); 
                   showScreen(introScreen);
            }
            else if (selection55Screen.style.display === 'block') {
                showScreen(introScreen);
            }
              else if (calculatorScreen.style.display === 'block') {
                   
                   resetCalculator(); 
                   showScreen(introScreen);
              }
        });
    });
    
document.addEventListener('contextmenu', (event) => {
    event.preventDefault(); 
});
    showScreen(introScreen);
});

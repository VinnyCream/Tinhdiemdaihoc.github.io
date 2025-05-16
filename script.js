document.addEventListener('DOMContentLoaded', () => {
    // --- Lấy các phần tử HTML ---
    const introScreen = document.getElementById('intro-screen');
    const selection55Screen = document.getElementById('selection-55-screen');
    const calculatorScreen = document.getElementById('calculator-screen');

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
    const backButtons = document.querySelectorAll('.back-btn'); // Lấy tất cả nút back

    let currentWeighting = null; // Biến để lưu trữ hệ điểm hiện tại

    // --- Hàm hiển thị màn hình ---
    function showScreen(screenToShow) {
        const screens = [introScreen, selection55Screen, calculatorScreen];
        screens.forEach(screen => {
            screen.style.display = 'none';
        });
        screenToShow.style.display = 'block';
    }

    // --- Hàm cấu hình màn hình tính toán ---
    function setupCalculatorScreen(weightingType) {
        currentWeighting = weightingType;
        calculatorTitle.textContent = `Nhập Điểm - Hệ ${weightingType === '5:5-standard' ? 'Chuẩn 5:5' : weightingType === '5:5-235' ? '2:3:5' : weightingType}`;

        // Ẩn tất cả nhóm input trước
        inputs55Standard.style.display = 'none';
        inputs55235.style.display = 'none';
        inputs46.style.display = 'none';
        inputs37.style.display = 'none';

        // Hiển thị nhóm input tương ứng
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
        resetCalculator(); // Reset các trường input khi chuyển màn hình
    }

    // --- Hàm reset màn hình tính toán ---
    function resetCalculator() {
        // Clear tất cả các input
        const allInputs = calculatorScreen.querySelectorAll('input[type="number"]');
        allInputs.forEach(input => {
            input.value = '';
        });

        // Clear kết quả
        resultDiv.textContent = '';
        resultDiv.className = 'result'; // Reset class
    }

    // --- Hàm chuyển đổi điểm 10 sang Thang 10 (khoảng), Thang 4, Điểm Chữ ---
    function convertToGrades(score10) {
        let range10, score4, letter;

        if (score10 >= 9.5 && score10 <= 10) {
            range10 = '9.5 - 10';
            score4 = 4.0;
            letter = 'A+';
        } else if (score10 >= 8.5 && score10 <= 9.4) {
             range10 = '8.5 - 9.4';
             score4 = 4.0;
             letter = 'A';
        } else if (score10 >= 8.0 && score10 <= 8.4) {
            range10 = '8.0 - 8.4';
            score4 = 3.5;
            letter = 'B+';
        } else if (score10 >= 7.0 && score10 <= 7.9) {
            range10 = '7.0 - 7.9';
            score4 = 3.0;
            letter = 'B';
        } else if (score10 >= 6.0 && score10 <= 6.9) {
            range10 = '6.0 - 6.9';
            score4 = 2.5;
            letter = 'C+';
        } else if (score10 >= 5.5 && score10 <= 5.9) {
            range10 = '5.5 - 5.9';
            score4 = 2.0;
            letter = 'C';
        } else if (score10 >= 5.0 && score10 <= 5.4) {
            range10 = '5.0 - 5.4';
            score4 = 1.5;
            letter = 'D+';
        } else if (score10 >= 4.0 && score10 <= 4.9) {
            range10 = '4.0 - 4.9';
            score4 = 1.0;
            letter = 'D';
        } else { // Includes 0 to 3.9
            range10 = '0 - 3.9';
            score4 = 0;
            letter = 'F';
        }

        return { range10, score4, letter };
    }


    // --- Hàm tính điểm ---
    function calculateScore() {
        let diemTong = 0;
        let inputsValid = true; // Cờ kiểm tra input hợp lệ

        // Hàm helper để lấy giá trị input và kiểm tra
        const getAndValidateInput = (inputElement) => {
            const value = parseFloat(inputElement.value);
            if (isNaN(value) || value < 0 || value > 10) {
                inputsValid = false;
                return null;
            }
            return value;
        };

        // Lấy giá trị input dựa trên hệ số đã chọn
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
            resultDiv.textContent = 'Vui lòng nhập điểm hợp lệ từ 0 đến 10.';
            resultDiv.style.color = 'red'; // Hoặc dùng class riêng cho lỗi
            resultDiv.classList.remove('dau', 'rot'); // Remove color classes
             resultDiv.style.backgroundColor = ''; // Xóa màu nền của class dau/rot
             resultDiv.style.border = ''; // Xóa border của class dau/rot
        } else {
            // Làm tròn điểm tổng đến 2 chữ số thập phân
            diemTong = Math.round(diemTong * 100) / 100;

            // --- Chuyển đổi sang các hệ điểm khác ---
            const grades = convertToGrades(diemTong);

            // Xác định trạng thái Qua môn / Rớt môn và màu sắc chữ
            const passStatusText = diemTong >= 4 ? '<span style="color: #155724; font-weight: bold;">Qua môn</span>' : '<span style="color: #721c24; font-weight: bold;">Rớt môn</span>';

            // Cập nhật nội dung resultDiv bằng innerHTML để hiển thị nhiều dòng
            resultDiv.innerHTML = `
                <p><strong>Điểm Tổng: ${diemTong.toFixed(2)}</strong> - ${passStatusText}</p>
                <p><strong>Thang điểm 10:</strong> ${grades.range10}</p> <p><strong>Thang điểm 4:</strong> ${grades.score4.toFixed(1)}</p> <p><strong>Điểm Chữ:</strong> ${grades.letter}</p> `;

            // Áp dụng class màu nền cho toàn bộ div kết quả dựa trên Điểm Chữ (F là màu đỏ, còn lại màu xanh)
            if (grades.letter === 'F') {
                 resultDiv.classList.add('rot');
                 resultDiv.classList.remove('dau');
            } else {
                 resultDiv.classList.add('dau');
                 resultDiv.classList.remove('rot');
            }

            resultDiv.style.color = ''; // Xóa style màu lỗi nếu có
            // Màu chữ cho các dòng kết quả khác được định nghĩa trong CSS (.result p) hoặc thừa hưởng từ .result
            // Nếu muốn màu chữ cụ thể cho từng dòng, có thể thêm style trực tiếp vào các thẻ <p>
        }
    }

    // --- ThêmEventListeners cho các nút ---

    // Nút chọn hệ điểm chính (5:5, 4:6, 3:7)
    introButtons.forEach(button => {
        button.addEventListener('click', () => {
            const weight = button.dataset.weight;
            if (weight === '5:5') {
                showScreen(selection55Screen);
            } else {
                setupCalculatorScreen(weight);
            }
        });
    });

    // Nút chọn hệ điểm con cho 5:5 (Chuẩn, 2:3:5)
    selection55Buttons.forEach(button => {
         // Loại bỏ nút back khỏi việc thêm event listener chọn hệ điểm
        if (!button.classList.contains('back-btn')) {
            button.addEventListener('click', () => {
                const weight = button.dataset.weight;
                setupCalculatorScreen(weight);
            });
        }
    });

    // Nút Tính điểm
    calculateButton.addEventListener('click', calculateScore);

    // Nút Reset
    resetButton.addEventListener('click', resetCalculator);

    // Nút Quay trở về trang đầu (cho cả 2 màn hình)
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentWeighting = null; // Reset hệ số
            resetCalculator(); // Reset màn hình tính toán
            showScreen(introScreen); // Quay về màn hình giới thiệu
        });
    });

    // --- Hiển thị màn hình giới thiệu khi tải trang ---
    showScreen(introScreen);
});
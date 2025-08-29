let grupoIdCounter = 1;

// Array of icons for groups
const grupoIcons = [
    '🎯', '🌟', '🎲', '⭐', '🔥', '💎', '🎊', '🎈', 
    '🌈', '⚡', '🎪', '🎭', '🎨', '🎵', '🎸', '🏆'
];

// Array of card colors
const cardColors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6', 'color-7', 'color-8'];

// Counter for assigning colors and icons
let colorCounter = 0;
let iconCounter = 0;

// Security: Input sanitization and validation
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.replace(/[<>"'&]/g, function(match) {
        const map = {
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '&': '&amp;'
        };
        return map[match];
    }).trim();
}

function validateNumberInput(input) {
    const numbers = input.split(',').map(n => n.trim()).filter(n => n !== '');
    return numbers.every(n => /^\d+$/.test(n));
}

// Generate unique ID
function gerarIdGrupo() {
    return 'grupo_' + grupoIdCounter++ + '_' + Date.now();
}

// Enhanced localStorage with error handling and data validation
function salvarDados() {
    try {
        const grupos = [];
        const gruposElements = document.querySelectorAll('.grupo');
        
        gruposElements.forEach(grupo => {
            const nome = sanitizeInput(grupo.querySelector('h3').textContent);
            const numeros = sanitizeInput(grupo.querySelector('input[type="text"]').value);
            const quantidade = parseInt(grupo.querySelector('input[type="number"]').value, 10);
            
            if (nome && numeros && !isNaN(quantidade)) {
                grupos.push({
                    nome: nome,
                    numeros: numeros,
                    quantidade: quantidade
                });
            }
        });
        
        const delayValue = parseFloat(document.getElementById('delay-input').value) || 2;
        
        const dadosParaSalvar = {
            grupos: grupos,
            delay: delayValue,
            iconCounter: iconCounter,
            colorCounter: colorCounter,
            timestamp: new Date().toISOString(),
            version: '2.0'
        };
        
        localStorage.setItem('sorteador-dados', JSON.stringify(dadosParaSalvar));
        mostrarNotificacao('Dados salvos com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
        mostrarNotificacao('Erro ao salvar dados: ' + error.message, 'error');
    }
}

function carregarDados() {
    try {
        const dadosSalvos = localStorage.getItem('sorteador-dados');
        
        if (!dadosSalvos) {
            mostrarNotificacao('Nenhum dado salvo encontrado!', 'warning');
            return;
        }
        
        const dados = JSON.parse(dadosSalvos);
        
        // Data validation
        if (!dados || typeof dados !== 'object') {
            throw new Error('Formato de dados inválido');
        }
        
        // Clear existing groups
        document.getElementById('grupos-container').innerHTML = '';
        
        // Restore delay
        if (dados.delay && !isNaN(dados.delay)) {
            document.getElementById('delay-input').value = dados.delay;
        }
        
        // Restore counters
        if (dados.iconCounter !== undefined) {
            iconCounter = dados.iconCounter;
        }
        if (dados.colorCounter !== undefined) {
            colorCounter = dados.colorCounter;
        }
        
        // Restore groups with validation
        if (dados.grupos && Array.isArray(dados.grupos) && dados.grupos.length > 0) {
            dados.grupos.forEach(grupoData => {
                if (grupoData.nome && grupoData.numeros !== undefined && grupoData.quantidade) {
                    criarGrupo(
                        sanitizeInput(grupoData.nome), 
                        sanitizeInput(grupoData.numeros), 
                        grupoData.quantidade
                    );
                }
            });
            mostrarNotificacao('Dados carregados com sucesso!', 'success');
        } else {
            mostrarNotificacao('Nenhum grupo encontrado nos dados salvos!', 'warning');
        }
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        mostrarNotificacao('Erro ao carregar dados: ' + error.message, 'error');
    }
}

function limparTudo() {
    if (confirm('Tem certeza que deseja limpar todos os dados salvos? Esta ação não pode ser desfeita.')) {
        try {
            localStorage.removeItem('sorteador-dados');
            document.getElementById('grupos-container').innerHTML = '';
            document.getElementById('delay-input').value = '2';
            // Reset counters
            iconCounter = 0;
            colorCounter = 0;
            mostrarNotificacao('Todos os dados foram limpos!', 'success');
        } catch (error) {
            console.error('Erro ao limpar dados:', error);
            mostrarNotificacao('Erro ao limpar dados: ' + error.message, 'error');
        }
    }
}

// Enhanced notification system
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${tipo}`;
    notification.textContent = mensagem;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add celebration effect
function adicionarCelebracao(container) {
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    celebration.textContent = '🎉';
    container.style.position = 'relative';
    container.appendChild(celebration);
    
    setTimeout(() => {
        celebration.remove();
    }, 2000);
}

// Enhanced group creation with validation
function criarGrupo(nome, numeros = '', quantidade = '1') {
    const container = document.getElementById('grupos-container');
    const grupoDiv = document.createElement('div');
    const grupoId = gerarIdGrupo();
    grupoDiv.className = 'grupo';
    grupoDiv.id = grupoId;
    
    // Security: Sanitize inputs
    nome = sanitizeInput(nome);
    numeros = sanitizeInput(numeros);
    quantidade = parseInt(quantidade, 10) || 1;

    // Get icon and color for this group
    const icon = grupoIcons[iconCounter % grupoIcons.length];
    const cardColor = cardColors[colorCounter % cardColors.length];
    
    // Increment counters
    iconCounter++;
    colorCounter++;

    grupoDiv.innerHTML = `
        <h3><span class="icon">${icon}</span>${nome}</h3>
        <label>Números (separados por vírgula):</label>
        <input type="text" value="${numeros}" placeholder="Ex: 1, 4, 6, 7, 9" 
               pattern="[0-9,\\s]+" 
               title="Digite apenas números separados por vírgula"
               autocomplete="off">
        <label>Quantidade a sortear:</label>
        <input type="number" value="${quantidade}" min="1" max="1000" 
               autocomplete="off">
        
        <div class="card-container">
            <div class="card" id="card-${grupoId}">
                <div class="card-front ${cardColor}">
                    🎲 Toque em "Sortear" para revelar os números!
                </div>
                <div class="card-back">
                    <div class="resultado"></div>
                </div>
            </div>
        </div>
        
        <div class="button-group">
            <button class="btn-primary" onclick="realizarSorteio('${grupoId}')" 
                    aria-label="Sortear números para ${nome}">
                🎯 Sortear
            </button>
            <button class="btn-destructive" onclick="excluirGrupo('${grupoId}')" 
                    aria-label="Excluir grupo ${nome}">
                🗑️ Excluir Grupo
            </button>
        </div>
    `;

    container.appendChild(grupoDiv);
    
    // Add mobile touch events for card flip
    const card = grupoDiv.querySelector('.card');
    let touchStartX = 0;
    let touchStartY = 0;
    
    card.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    card.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Swipe gesture detection (horizontal swipe)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            card.classList.toggle('flipped');
        }
    }, { passive: true });
}

function adicionarGrupo() {
    const nomeGrupo = prompt("Digite o nome do novo grupo:");
    if (!nomeGrupo || nomeGrupo.trim() === '') {
        mostrarNotificacao('Nome do grupo é obrigatório!', 'warning');
        return;
    }
    
    // Security: Validate and sanitize input
    const nomeSeguro = sanitizeInput(nomeGrupo.trim());
    if (nomeSeguro.length > 50) {
        mostrarNotificacao('Nome do grupo muito longo (máximo 50 caracteres)!', 'warning');
        return;
    }
    
    criarGrupo(nomeSeguro);
    mostrarNotificacao('Grupo criado com sucesso!', 'success');
}

function excluirGrupo(grupoId) {
    const grupoDiv = document.getElementById(grupoId);
    if (!grupoDiv) return;
    
    const nomeGrupo = grupoDiv.querySelector('h3').textContent;
    
    if (confirm(`Tem certeza que deseja excluir o grupo "${nomeGrupo}"?`)) {
        grupoDiv.style.transform = 'scale(0.8)';
        grupoDiv.style.opacity = '0';
        grupoDiv.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            grupoDiv.remove();
            mostrarNotificacao('Grupo excluído com sucesso!', 'success');
        }, 300);
    }
}

function realizarSorteio(grupoId) {
    const grupoDiv = document.getElementById(grupoId);
    if (!grupoDiv) return;
    
    const numerosInput = grupoDiv.querySelector('input[type="text"]').value;
    const quantidadeInput = parseInt(grupoDiv.querySelector('input[type="number"]').value, 10);
    const card = grupoDiv.querySelector('.card');
    const resultadoDiv = grupoDiv.querySelector('.resultado');
    const sortearBtn = grupoDiv.querySelector('.btn-primary');
    
    // Input validation
    if (!numerosInput.trim()) {
        mostrarNotificacao('Por favor, insira os números para o sorteio.', 'warning');
        return;
    }
    
    if (!validateNumberInput(numerosInput)) {
        mostrarNotificacao('Por favor, insira apenas números separados por vírgula.', 'warning');
        return;
    }
    
    if (isNaN(quantidadeInput) || quantidadeInput < 1) {
        mostrarNotificacao('Quantidade inválida. Deve ser um número maior que 0.', 'warning');
        return;
    }
    
    // Reset card flip
    card.classList.remove('flipped');
    
    const numerosArray = numerosInput.split(',').map(n => n.trim()).filter(n => n !== '');

    if (numerosArray.length === 0) {
        mostrarNotificacao('Por favor, insira pelo menos um número.', 'warning');
        return;
    }

    if (quantidadeInput > numerosArray.length) {
        mostrarNotificacao('A quantidade a sortear não pode ser maior que a quantidade de números disponíveis.', 'warning');
        return;
    }
    
    // Security: Limit max quantity
    if (quantidadeInput > 100) {
        mostrarNotificacao('Quantidade muito alta (máximo 100).', 'warning');
        return;
    }
    
    // Disable button and show loading
    sortearBtn.disabled = true;
    sortearBtn.innerHTML = '<span class="loading"></span> Sorteando...';
    
    const delaySegundos = Math.max(0, Math.min(10, parseFloat(document.getElementById('delay-input').value) || 2));
    
    // Start countdown if delay is greater than 0
    if (delaySegundos > 0) {
        iniciarContadorRegressivo(resultadoDiv, card, delaySegundos, () => {
            executarSorteio(numerosArray, quantidadeInput, resultadoDiv, card, sortearBtn, grupoDiv);
        });
    } else {
        // Execute immediately if no delay
        executarSorteio(numerosArray, quantidadeInput, resultadoDiv, card, sortearBtn, grupoDiv);
    }
}

// New function to handle countdown
function iniciarContadorRegressivo(resultadoDiv, card, delaySegundos, callback) {
    let tempoRestante = delaySegundos;
    
    // Show countdown on card back
    resultadoDiv.innerHTML = `
        <div class="countdown-text">Sorteando em:</div>
        <div class="countdown">${Math.ceil(tempoRestante)}</div>
    `;
    
    // Flip card to show countdown
    card.classList.add('flipped');
    
    const intervalId = setInterval(() => {
        tempoRestante -= 0.1;
        
        if (tempoRestante <= 0) {
            clearInterval(intervalId);
            callback();
        } else {
            // Update countdown display
            const countdownElement = resultadoDiv.querySelector('.countdown');
            if (countdownElement) {
                countdownElement.textContent = Math.ceil(tempoRestante);
            }
        }
    }, 100); // Update every 100ms for smoother countdown
}

// Separated lottery execution logic
function executarSorteio(numerosArray, quantidadeInput, resultadoDiv, card, sortearBtn, grupoDiv) {
    try {
        let sorteados = [];
        let copiaArray = [...numerosArray];

        for (let i = 0; i < quantidadeInput; i++) {
            const indiceSorteado = Math.floor(Math.random() * copiaArray.length);
            sorteados.push(copiaArray.splice(indiceSorteado, 1)[0]);
        }

        // Enhanced display with large numbers
        resultadoDiv.innerHTML = `
            <h4>🎉 Números Sorteados:</h4>
            <div class="numbers">
                ${sorteados.join(' • ')}
            </div>
        `;
        
        // Ensure card is flipped to show results
        card.classList.add('flipped');
        
        // Add celebration effect
        adicionarCelebracao(grupoDiv);
        
        // Vibration feedback on mobile devices
        if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200]);
        }
        
        mostrarNotificacao('Sorteio realizado com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro no sorteio:', error);
        mostrarNotificacao('Erro ao realizar sorteio: ' + error.message, 'error');
        resultadoDiv.innerHTML = '<div style="color: hsl(var(--destructive));">Erro no sorteio</div>';
    } finally {
        // Re-enable button
        sortearBtn.disabled = false;
        sortearBtn.innerHTML = '🎯 Sortear';
    }
}

// Enhanced initialization with error handling
window.onload = function() {
    try {
        // Try to load saved data first
        const dadosSalvos = localStorage.getItem('sorteador-dados');
        
        if (dadosSalvos) {
            const dados = JSON.parse(dadosSalvos);
            
            // Restore delay with validation
            if (dados.delay && !isNaN(dados.delay)) {
                document.getElementById('delay-input').value = Math.max(0, Math.min(10, dados.delay));
            }
            
            // Restore counters
            if (dados.iconCounter !== undefined) {
                iconCounter = dados.iconCounter;
            }
            if (dados.colorCounter !== undefined) {
                colorCounter = dados.colorCounter;
            }
            
            // Restore groups if they exist and are valid
            if (dados.grupos && Array.isArray(dados.grupos) && dados.grupos.length > 0) {
                dados.grupos.forEach(grupoData => {
                    if (grupoData.nome && grupoData.numeros !== undefined && grupoData.quantidade) {
                        criarGrupo(
                            sanitizeInput(grupoData.nome), 
                            sanitizeInput(grupoData.numeros), 
                            grupoData.quantidade
                        );
                    }
                });
                return; // Don't create example groups if saved data exists
            }
        }
    } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
        mostrarNotificacao('Erro ao carregar dados salvos. Criando grupos padrão.', 'warning');
    }
    
    // Create example groups only if no saved data exists
    criarGrupo('Fauna', '1, 4, 6, 7, 9', '2');
    criarGrupo('Flora', '2, 3, 5, 8, 10', '2');
};

// Add keyboard shortcuts for accessibility
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        salvarDados();
    }
    // Ctrl/Cmd + L to load
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        carregarDados();
    }
});

// Service Worker registration for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker can be added later for offline functionality
    });
}
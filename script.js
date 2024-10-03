let races = {};
let classes = [];

document.addEventListener('DOMContentLoaded', () => {
    const abilityScores = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
    const skills = [
        'Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception',
        'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine',
        'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion',
        'Sleight of Hand', 'Stealth', 'Survival'
    ];

    const startMenu = document.getElementById('startMenu');
    const characterCreator = document.getElementById('characterCreator');
    const cards = Array.from(document.querySelectorAll('#characterCreator .card'));
    const saveCharacterButton = document.getElementById('saveCharacterButton');
    const randomNameButton = document.getElementById('randomName');
    const raceSelect = document.getElementById('race');
    const classSelect = document.getElementById('class');
    const subclassSelect = document.getElementById('subclass');
    const levelInput = document.getElementById('level');
    const abilityColumns = document.querySelectorAll('.ability-column');
    const skillList = document.getElementById('skillList');
    const characterForm = document.getElementById('characterForm');
    const themeControls = document.querySelector('.theme-controls');
    const nameInput = document.getElementById('name');
    const classFeaturesList = document.getElementById('classFeaturesList');
    const raceTraitsList = document.getElementById('raceTraitsList');

    let currentCardIndex = -1;

    function showCard(index) {
        if (index === -1) {
            startMenu.classList.remove('hidden');
            characterCreator.classList.add('hidden');
            themeControls.classList.add('hidden');
        } else {
            startMenu.classList.add('hidden');
            characterCreator.classList.remove('hidden');
            themeControls.classList.add('hidden');
            cards.forEach((card, i) => {
                card.classList.toggle('hidden', i !== index);
            });
        }
        currentCardIndex = index;
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        cards.forEach((card, i) => {
            const prevButton = card.querySelector('.prev-button');
            const nextButton = card.querySelector('.next-button');
            
            if (prevButton) {
                prevButton.classList.toggle('hidden', i === 0);
            }
            if (nextButton) {
                nextButton.classList.toggle('hidden', i === cards.length - 1);
            }
        });
    }

    function createAbilityScoreElements() {
        abilityScores.forEach((ability, index) => {
            const abilityDiv = document.createElement('div');
            abilityDiv.classList.add('ability-score');
            abilityDiv.innerHTML = `
                <button type="button" class="rollAbility" data-ability="${ability.toLowerCase()}">
                    ${ability}
                </button>
                <div class="roll-options hidden"></div>
            `;
            abilityColumns[Math.floor(index / 3)].appendChild(abilityDiv);
        });
    }

    function handleRollAbility(button) {
        const ability = button.dataset.ability;
        const rollOptionsDiv = button.nextElementSibling;
        rollOptionsDiv.innerHTML = '';
        rollOptionsDiv.classList.remove('hidden');

        const rolls = [];
        for (let i = 0; i < 3; i++) {
            const roll = rollAbilityScore();
            rolls.push(roll);
            const rollButton = document.createElement('button');
            rollButton.classList.add('roll-option');
            const modifier = getModifierString(roll);
            rollButton.textContent = `${roll} (${modifier})`;
            rollButton.dataset.roll = roll;
            rollButton.dataset.modifier = modifier;
            rollOptionsDiv.appendChild(rollButton);
        }

        // Make the highest roll button bold
        const highestRoll = Math.max(...rolls);
        rollOptionsDiv.querySelector(`[data-roll="${highestRoll}"]`).style.fontWeight = 'bold';
    }

    function handleRollOption(button) {
        const abilityScore = button.closest('.ability-score');
        const abilityButton = abilityScore.querySelector('.rollAbility');
        const ability = abilityButton.dataset.ability;
        let roll = parseInt(button.dataset.roll);
        
        // Apply racial bonus
        const racialBonus = getRacialBonus(ability);
        roll += racialBonus;

        const modifier = getModifierString(roll);
        
        abilityButton.textContent = `${ability}${racialBonus > 0 ? '*' : ''}: ${roll} (${modifier})`;
        abilityButton.dataset.value = roll;
        abilityButton.disabled = true;
        
        // Disable all roll option buttons in this ability score group
        const rollOptionsDiv = abilityScore.querySelector('.roll-options');
        rollOptionsDiv.querySelectorAll('.roll-option').forEach(optionButton => {
            optionButton.disabled = true;
            optionButton.style.opacity = '0.5';
        });
        
        updateAbilityModifier(ability);
        updateSkillModifiers();
    }

    function getModifierString(score) {
        const modifier = Math.floor((score - 10) / 2);
        return modifier >= 0 ? `+${modifier}` : `${modifier}`;
    }

    function rollAbilityScore() {
        const rolls = Array(4).fill().map(() => Math.floor(Math.random() * 6) + 1);
        return rolls.sort((a, b) => b - a).slice(0, 3).reduce((sum, roll) => sum + roll, 0);
    }

    function updateAbilityModifier(ability) {
        const button = document.querySelector(`[data-ability="${ability.toLowerCase()}"]`);
        if (button) {
            const score = parseInt(button.dataset.value) || 0;
            const modifier = Math.floor((score - 10) / 2);
            
            const modifierInput = document.querySelector(`#${ability.toLowerCase()}Modifier`);
            if (modifierInput) {
                modifierInput.value = modifier >= 0 ? `+${modifier}` : `${modifier}`;
            }
        }
    }

    function updateSkillModifiers() {
        const skillAbilityMap = {
            'Acrobatics': 'dexterity',
            'Animal Handling': 'wisdom',
            'Arcana': 'intelligence',
            'Athletics': 'strength',
            'Deception': 'charisma',
            'History': 'intelligence',
            'Insight': 'wisdom',
            'Intimidation': 'charisma',
            'Investigation': 'intelligence',
            'Medicine': 'wisdom',
            'Nature': 'intelligence',
            'Perception': 'wisdom',
            'Performance': 'charisma',
            'Persuasion': 'charisma',
            'Religion': 'intelligence',
            'Sleight of Hand': 'dexterity',
            'Stealth': 'dexterity',
            'Survival': 'wisdom'
        };

        skillList.innerHTML = '';

        for (const [skill, ability] of Object.entries(skillAbilityMap)) {
            const abilityButton = document.querySelector(`[data-ability="${ability}"]`);
            const abilityScore = parseInt(abilityButton?.dataset.value) || 10;
            const modifier = Math.floor((abilityScore - 10) / 2);
            const modifierString = modifier >= 0 ? `+${modifier}` : `${modifier}`;

            const skillItem = document.createElement('div');
            skillItem.classList.add('skill-item');
            skillItem.innerHTML = `
                <span>${skill} (${ability.charAt(0).toUpperCase() + ability.slice(1)}): ${modifierString}</span>
            `;
            skillList.appendChild(skillItem);
        }
    }

    function populateRaceSelect() {
        raceSelect.innerHTML = '<option value="">Select a race</option>';
        for (const race in races) {
            const option = document.createElement('option');
            option.value = race;
            option.textContent = race;
            raceSelect.appendChild(option);
        }
    }

    function populateClassSelect() {
        classSelect.innerHTML = '<option value="">Select a class</option>';
        classes.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.name;
            option.textContent = cls.name;
            classSelect.appendChild(option);
        });
    }

    function updateSubclassSelect() {
        const selectedClassName = classSelect.value;
        const selectedClass = classes.find(c => c.name === selectedClassName);
        subclassSelect.innerHTML = '<option value="">Select a subclass</option>';
        subclassSelect.disabled = true;
    
        if (selectedClass && selectedClass.subclasses && levelInput.value >= 3) {
            const addedSubclasses = new Set();
            selectedClass.subclasses.forEach(subclass => {
                if (!addedSubclasses.has(subclass.name)) {
                    const option = document.createElement('option');
                    option.value = subclass.name;
                    option.textContent = subclass.shortName || subclass.name;
                    subclassSelect.appendChild(option);
                    addedSubclasses.add(subclass.name);
                }
            });
            subclassSelect.disabled = false;
        }
    }
    
    function updateClassFeatures() {
        const selectedClassName = classSelect.value;
        const selectedClass = classes.find(c => c.name === selectedClassName);
        const level = parseInt(levelInput.value);
        classFeaturesList.innerHTML = '';
    
        if (selectedClass && selectedClass.classFeatures) {
            selectedClass.classFeatures.forEach(feature => {
                const [featureName, , , featureLevel] = feature.split('|');
                if (parseInt(featureLevel) <= level) {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${featureName}:</strong> `;
                    classFeaturesList.appendChild(li);
                }
            });
        }
    }

    function updateAbilityNamesWithAsterisks() {
        const race = raceSelect.value;
        const raceTraits = races[race]?.traits;

        abilityScores.forEach(ability => {
            const abilityButton = document.querySelector(`[data-ability="${ability.toLowerCase()}"]`);
            if (abilityButton) {
                const hasBonus = raceTraits?.abilityScoreIncrease?.[ability.toLowerCase()];
                abilityButton.textContent = `${ability}${hasBonus ? '*' : ''}`;
            }
        });
    }

    function getRacialBonus(ability) {
        const race = raceSelect.value;
        const raceTraits = races[race]?.traits;
        return raceTraits?.abilityScoreIncrease?.[ability.toLowerCase()] || 0;
    }

    function updateRaceTraits() {
        const race = raceSelect.value;
        const raceTraits = races[race]?.traits;
        raceTraitsList.innerHTML = '';

        if (raceTraits) {
            for (const [trait, value] of Object.entries(raceTraits)) {
                if (trait !== 'abilityScoreIncrease') {
                    const li = document.createElement('li');
                    const traitName = trait.replace(/([A-Z])/g, ' $1').trim();
                    li.innerHTML = `<strong>${traitName}:</strong> ${value}`;
                    raceTraitsList.appendChild(li);
                }
            }
        }
    }

    function generateRandomName() {
        const names = ['Aragorn', 'Legolas', 'Gimli', 'Gandalf', 'Frodo', 'Samwise', 'Bilbo', 'Elrond', 'Galadriel', 'Thorin'];
        return names[Math.floor(Math.random() * names.length)];
    }

    // Event Listeners
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('rollAbility') && !e.target.disabled) {
            e.preventDefault();
            handleRollAbility(e.target);
        } else if (e.target.classList.contains('roll-option')) {
            e.preventDefault();
            handleRollOption(e.target);
        }
    });

    raceSelect.addEventListener('change', () => {
        abilityScores.forEach(ability => {
            const abilityButton = document.querySelector(`[data-ability="${ability.toLowerCase()}"]`);
            if (abilityButton) {
                abilityButton.textContent = ability;
                abilityButton.disabled = false;
                abilityButton.dataset.value = '';
                const rollOptionsDiv = abilityButton.nextElementSibling;
                rollOptionsDiv.innerHTML = '';
                rollOptionsDiv.classList.add('hidden');
            }
        });
        updateAbilityNamesWithAsterisks();
        updateSkillModifiers();
        updateRaceTraits();
    });

    classSelect.addEventListener('change', () => {
        updateSubclassSelect();
        updateClassFeatures();
        if (levelInput.value < 3) {
            levelInput.value = 3;
        }
    });

    subclassSelect.addEventListener('change', () => {
        if (levelInput.value < 3) {
            levelInput.value = 3;
        }
    });

    levelInput.addEventListener('change', () => {
        updateSubclassSelect();
        updateClassFeatures();
    });

    randomNameButton.addEventListener('click', () => {
        nameInput.value = generateRandomName();
    });

    document.querySelectorAll('.next-button, .prev-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const direction = this.classList.contains('next-button') ? 1 : -1;
            showCard(currentCardIndex + direction);
        });
    });

    // Start button functionality
    const startButton = startMenu.querySelector('.next-button');
    if (startButton) {
        startButton.addEventListener('click', function(e) {
            e.preventDefault();
            showCard(0);
        });
    }

    // Initialization
    function init() {
        createAbilityScoreElements();
        showCard(-1); // Start by showing the start menu
        updateSkillModifiers();
    }

    // Fetch data and initialize
    Promise.all([
        fetch('races.json').then(response => response.json()),
        fetch('classes.json').then(response => response.json())
    ]).then(([racesData, classesData]) => {
        races = racesData;
        classes = classesData;
        populateRaceSelect();
        populateClassSelect();
        init();
    }).catch(error => console.error('Error loading data:', error));
});
// Constants and global variables
const abilityScores = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
const skills = [
    'Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception',
    'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine',
    'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion',
    'Sleight of Hand', 'Stealth', 'Survival'
];
const spellLevels = ['Cantrips', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'];

let races = {};
let classes = [];
let weapons = [];
let armors = [];
let items = [];
let spells = [];


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

let currentCardIndex = -1;
let currentSectionIndex = 0;
const sections = ['attributesSection', 'skillsSection', 'inventorySection', 'spellcastingSection', 'optionsSection'];

const character = {
    name: '',
    race: '',
    class: '',
    subclass: '',
    level: 1,
    hitDie: {
        number: 1,
        faces: 8
    },
    maxHitDice: 1,
    currentHitDice: 1,
    background: '',
    abilityScores: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10
    },
    skills: {
        acrobatics: { proficient: false, bonus: 0 },
        animalHandling: { proficient: false, bonus: 0 },
        arcana: { proficient: false, bonus: 0 },
        athletics: { proficient: false, bonus: 0 },
        deception: { proficient: false, bonus: 0 },
        history: { proficient: false, bonus: 0 },
        insight: { proficient: false, bonus: 0 },
        intimidation: { proficient: false, bonus: 0 },
        investigation: { proficient: false, bonus: 0 },
        medicine: { proficient: false, bonus: 0 },
        nature: { proficient: false, bonus: 0 },
        perception: { proficient: false, bonus: 0 },
        performance: { proficient: false, bonus: 0 },
        persuasion: { proficient: false, bonus: 0 },
        religion: { proficient: false, bonus: 0 },
        sleightOfHand: { proficient: false, bonus: 0 },
        stealth: { proficient: false, bonus: 0 },
        survival: { proficient: false, bonus: 0 }
    },
    feats: [],
    inventory: [],
    spells: [],
    hp: 0,
    maxHp: 0,
    ac: 10,
    initiative: 0,
    proficiencyBonus: 2,
    savingThrows: {
        strength: { value: 0, proficient: false },
        dexterity: { value: 0, proficient: false },
        constitution: { value: 0, proficient: false },
        intelligence: { value: 0, proficient: false },
        wisdom: { value: 0, proficient: false },
        charisma: { value: 0, proficient: false }
    },
    notes: '',
    currency: {
        copper: 0,
        silver: 0,
        electrum: 0,
        gold: 0,
        platinum: 0,
        gems: ''
    },
    abilityScoreImprovementsLeft: 0,
    speed: 30,
    experiencePoints: 0,
    languages: [],
    traits: [],
    spellSlots: {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
    }
};

// Global DOM element references
let nameInput, raceSelect, classSelect, subclassSelect, levelInput;
let saveCharacterButton, randomNameButton, restButton, restModal, closeRestModal;
let shortRestButton, longRestButton, prevSectionButton, nextSectionButton;
let rollInitiativeButton, modifyHPButton, hpModal, closeModal, healButton, damageButton;
let hpChangeAmount, addSpellButton, characterNotes;
let saveCharacterJsonButton, loadCharacterJsonButton, returnToCreatorButton, levelUpButton;
let themeColorSelect, themeModeToggle, addInventoryItemButton, updateCurrencyButton;
let startButton, randomCharacterButton;
let classFeaturesList, raceTraitsList;

// Initialize DOM elements
function initializeDOMElements() {
    nameInput = document.getElementById('name');
    raceSelect = document.getElementById('race');
    classSelect = document.getElementById('class');
    subclassSelect = document.getElementById('subclass');
    levelInput = document.getElementById('level');
    saveCharacterButton = document.getElementById('saveCharacterButton');
    randomNameButton = document.getElementById('randomName');
    restButton = document.getElementById('restButton');
    restModal = document.getElementById('restModal');
    closeRestModal = document.getElementById('closeRestModal');
    shortRestButton = document.getElementById('shortRestButton');
    longRestButton = document.getElementById('longRestButton');
    prevSectionButton = document.getElementById('prevSection');
    nextSectionButton = document.getElementById('nextSection');
    rollInitiativeButton = document.getElementById('rollInitiativeButton');
    modifyHPButton = document.getElementById('modifyHPButton');
    hpModal = document.getElementById('hpModal');
    closeModal = document.getElementById('closeModal');
    healButton = document.getElementById('healButton');
    damageButton = document.getElementById('damageButton');
    hpChangeAmount = document.getElementById('hpChangeAmount');
    addSpellButton = document.getElementById('addSpell');
    characterNotes = document.getElementById('characterNotes');
    saveCharacterJsonButton = document.getElementById('saveCharacterJson');
    loadCharacterJsonButton = document.getElementById('loadCharacterJson');
    returnToCreatorButton = document.getElementById('returnToCreator');
    levelUpButton = document.getElementById('levelUp');
    themeColorSelect = document.getElementById('themeColor');
    themeModeToggle = document.getElementById('themeMode');
    addInventoryItemButton = document.getElementById('addInventoryItem');
    updateCurrencyButton = document.getElementById('updateCurrency');
    startButton = document.querySelector('#startMenu .next-button');
    randomCharacterButton = document.getElementById('randomCharacter');
    classFeaturesList = document.getElementById('classFeaturesList');
    raceTraitsList = document.getElementById('raceTraitsList');
}


function startCharacterCreation() {
    console.log('Starting character creation');
    const startMenu = document.getElementById('startMenu');
    const characterCreator = document.getElementById('characterCreator');
    
    if (startMenu && characterCreator) {
        startMenu.classList.add('hidden');
        characterCreator.classList.remove('hidden');
        showCard(0); // Show the first card (Basic Information)
    } else {
        console.error('Start menu or character creator elements not found');
    }
}

// Utility functions
function rollD20() {
    return Math.floor(Math.random() * 20) + 1;
}

function rollDie(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function getModifierString(score) {
    const modifier = Math.floor((score - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}

function sortRacesAlphabetically(races) {
    return Object.keys(races).sort().reduce((sortedRaces, race) => {
        sortedRaces[race] = races[race];
        return sortedRaces;
    }, {});
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 2500);
}

// Character-related functions
function updateCharInfo(field) {
    console.log(`Updating character info for field: ${field}`);
    
    switch (field) {
        case 'name':
            character.name = nameInput.value;
            break;
        case 'race':
            character.race = raceSelect.value;
            updateRaceTraits();
            break;
        case 'class':
            character.class = classSelect.value;
            updateClassFeatures();
            updateSubclassSelect();
            break;
        case 'subclass':
            if (subclassSelect.selectedIndex > 0) {
                character.subclass = subclassSelect.options[subclassSelect.selectedIndex].value;
            } else {
                character.subclass = '';
            }
            break;
        case 'level':
            character.level = parseInt(levelInput.value) || 1;
            updateSubclassSelect();
            updateClassFeatures();
            break;
        // ... other cases ...
    }
    console.log(`Updated character ${field}:`, character[field]);
}

function generateRandomName() {
    const names = ['Aragorn', 'Legolas', 'Gimli', 'Gandalf', 'Frodo', 'Samwise', 'Bilbo', 'Elrond', 'Galadriel', 'Thorin'];
    return names[Math.floor(Math.random() * names.length)];
}

function getHitDiceByClass(characterClass) {
    const hitDice = {
        'Barbarian': 12,
        'Fighter': 10, 'Paladin': 10, 'Ranger': 10,
        'Bard': 8, 'Cleric': 8, 'Druid': 8, 'Monk': 8, 'Rogue': 8, 'Warlock': 8,
        'Sorcerer': 6, 'Wizard': 6
    };
    return hitDice[characterClass] || 8; // Default to d8 if class not found
}

function updateAbilityScores() {
    for (const [ability, score] of Object.entries(character.abilityScores)) {
        const abilityElement = document.querySelector(`[data-ability="${ability}"]`);
        if (abilityElement) {
            abilityElement.textContent = `${ability.charAt(0).toUpperCase() + ability.slice(1)}: ${score}`;
        }
    }
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
    const sheetSkills = document.getElementById('sheetSkills');
    if (!sheetSkills) {
        console.warn('Sheet skills element not found. Skipping skill update.');
        return;
    }

    sheetSkills.innerHTML = '';

    Object.entries(skillAbilityMap).forEach(([skillName, associatedAbility]) => {
        const abilityScore = character.abilityScores[associatedAbility] || 10;
        const abilityModifier = Math.floor((abilityScore - 10) / 2);
        const isProficient = character.skills[skillName.toLowerCase().replace(/\s+/g, '')]?.proficient || false;
        const totalBonus = isProficient ? abilityModifier + character.proficiencyBonus : abilityModifier;
        const bonusString = totalBonus >= 0 ? `+${totalBonus}` : `${totalBonus}`;
        
        const skillBox = document.createElement('div');
        skillBox.classList.add('skill-box');
        skillBox.innerHTML = `
            <div class="skill-name">${skillName}</div>
            <div class="skill-ability">(${associatedAbility.charAt(0).toUpperCase() + associatedAbility.slice(1)})</div>
            <button class="skill-bonus roll-button" data-skill="${skillName}" data-bonus="${totalBonus}">${bonusString}</button>
            ${isProficient ? '<span class="proficient-marker">●</span>' : ''}
        `;
        sheetSkills.appendChild(skillBox);
    });

    // Add event listeners to the roll buttons
    sheetSkills.querySelectorAll('.roll-button').forEach(button => {
        button.addEventListener('click', handleSkillRoll);
    });
}

function updateClassFeatures() {
    const characterSheet = document.getElementById('characterSheet');
    if (characterSheet.classList.contains('hidden')) {
        // Don't update if character sheet is not visible
        return;
    }

    const selectedClassName = classSelect ? classSelect.value : '';
    const selectedClass = classes.find(c => c.name === selectedClassName);
    const level = levelInput ? parseInt(levelInput.value) : 1;
    const classFeaturesList = document.getElementById('classFeaturesList');

    if (!classFeaturesList) {
        console.warn('Class features list element not found');
        return;
    }

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

    if (classFeaturesList.children.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No class features available at this level.';
        classFeaturesList.appendChild(li);
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
    const race = raceSelect ? raceSelect.value : '';
    const raceTraits = races[race]?.traits;
    const raceTraitsList = document.getElementById('raceTraitsList');

    if (!raceTraitsList) {
        console.warn('Race traits list element not found');
        return;
    }

    raceTraitsList.innerHTML = '';

    if (raceTraits) {
        for (const [trait, value] of Object.entries(raceTraits)) {
            if (trait !== 'abilityScoreIncrease') {
                const li = document.createElement('li');
                const traitName = trait.replace(/([A-Z])/g, ' $1').trim();
                li.innerHTML = `<strong>${traitName}:</strong> ${value}`;
                raceTraitsList.appendChild(li);
                character.notes += `${traitName}: ${value}\n`;
            }
        }
    }

    if (raceTraitsList.children.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No race traits available for this race.';
        raceTraitsList.appendChild(li);
    }
}

function shortRest() {
    console.log("Short rest function called");
    if (character.currentHitDice <= 0) {
        alert("You don't have any Hit Dice left to spend.");
        return;
    }

    let hitDiceSpent = 0;
    const maxHitDice = character.currentHitDice;

    while (hitDiceSpent < maxHitDice) {
        const wantToSpendHitDie = confirm(`Do you want to spend a Hit Die? (${hitDiceSpent} spent so far, ${character.currentHitDice} remaining)`);
        if (!wantToSpendHitDie) break;

        const hitDieRoll = rollDie(character.hitDie.faces);
        const conModifier = Math.floor((character.abilityScores.constitution - 10) / 2);
        const hpRegained = hitDieRoll + conModifier;

        character.hp = Math.min(character.hp + hpRegained, character.maxHp);
        hitDiceSpent++;
        character.currentHitDice--;

        alert(`You regained ${hpRegained} hit points. Current HP: ${character.hp}/${character.maxHp}`);
    }

    updateCharacterSheet();
}

function longRest() {
    console.log("Long rest function called");
    // Restore hit points to maximum
    character.hp = character.maxHp;

    // Restore spell slots
    for (let level in character.spellcasting.spellSlots) {
        character.spellcasting.currentSpellSlots[level] = character.spellcasting.spellSlots[level];
    }

    // Restore half of max Hit Dice (minimum of 1)
    const hitDiceRestored = Math.max(1, Math.floor(character.level / 2));
    character.currentHitDice = Math.min(character.level, character.currentHitDice + hitDiceRestored);

    updateCharacterSheet();
    alert("You've completed a long rest. Your hit points are restored to maximum, spell slots are refreshed, and you've regained some Hit Dice.");
}

// UI-related functions
function showCard(index) {
    console.log(`Showing card at index: ${index}`);
    const characterCreator = document.getElementById('characterCreator');
    const cards = Array.from(characterCreator.querySelectorAll('.card'));
    
    if (cards.length === 0) {
        console.error('No cards found in character creator');
        return;
    }

    if (index < 0 || index >= cards.length) {
        console.error('Invalid card index');
        return;
    }

    cards.forEach((card, i) => {
        card.classList.toggle('hidden', i !== index);
    });

    currentCardIndex = index;
    updateNavigationButtons();

    // If we're showing the Skills card, populate it
    if (index === 2) {
        populateSkillsList();
    }
}

function populateSkillsList() {
    const skillList = document.getElementById('skillList');
    if (!skillList) return;

    skillList.innerHTML = '';
    Object.entries(character.skills).forEach(([skillName, skillInfo]) => {
        const skillDiv = document.createElement('div');
        skillDiv.classList.add('skill-item');
        const formattedSkillName = skillName.replace(/([A-Z])/g, ' $1').trim();
        skillDiv.innerHTML = `
            <label>
                <input type="checkbox" name="skill_${skillName}" ${skillInfo.proficient ? 'checked' : ''}>
                ${formattedSkillName}
            </label>
        `;
        skillList.appendChild(skillDiv);
    });
}

function updateNavigationButtons() {
    const cards = Array.from(document.querySelectorAll('#characterCreator .card'));
    
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
    const abilityColumns = document.querySelector('.ability-columns');
    if (!abilityColumns) {
        console.error('Ability columns container not found');
        return;
    }

    abilityColumns.innerHTML = '';

    abilityScores.forEach((ability, index) => {
        const abilityDiv = document.createElement('div');
        abilityDiv.classList.add('ability-score');
        abilityDiv.innerHTML = `
            <button type="button" class="rollAbility" data-ability="${ability.toLowerCase()}">
                ${ability}
            </button>
            <div class="roll-options hidden"></div>
        `;
        abilityColumns.appendChild(abilityDiv);
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
    
    // Update the character object with the new ability score
    character.abilityScores[ability.toLowerCase()] = roll;
    
    updateAbilityModifier(ability);
    updateSkillModifiers();
}

function rollAbilityScore() {
    const rolls = Array(4).fill().map(() => Math.floor(Math.random() * 6) + 1);
    return rolls.sort((a, b) => b - a).slice(0, 3).reduce((sum, roll) => sum + roll, 0);
}

function populateRaceSelect() {
    const raceSelect = document.getElementById('race');
    if (!raceSelect) return;
    raceSelect.innerHTML = '<option value="">Select a race</option>';
    for (const race in races) {
        const option = document.createElement('option');
        option.value = race;
        option.textContent = race;
        raceSelect.appendChild(option);
    }
}

function populateClassSelect() {
    const classSelect = document.getElementById('class');
    if (!classSelect) return;
    classSelect.innerHTML = '<option value="">Select a class</option>';
    classes.forEach(cls => {
        const option = document.createElement('option');
        option.value = cls.name;
        option.textContent = cls.name;
        classSelect.appendChild(option);
    });
}

function updateSubclassSelect() {
    const classSelect = document.getElementById('class');
    const subclassSelect = document.getElementById('subclass');
    const levelInput = document.getElementById('level');
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

function adjustContentPadding() {
    const themeControls = document.getElementById('themeControls');
    const themeControlsHeight = themeControls.offsetHeight;
    document.body.style.paddingBottom = `${themeControlsHeight + 20}px`; // 20px extra for spacing
}

function applyTheme(color, isDark) {
    document.documentElement.style.setProperty('--accent-color', color);
    document.body.classList.toggle('dark-mode', isDark);

    // Set HSL values for the accent color
    const accentHSL = hexToHSL(color);
    document.body.style.setProperty('--accent-h', accentHSL.h);
    document.body.style.setProperty('--accent-s', `${accentHSL.s}%`);
    document.body.style.setProperty('--accent-l', `${accentHSL.l}%`);
}

function hexToHSL(hex) {
    // Remove the hash if it exists
    hex = hex.replace(/^#/, '');

    // Convert hex to RGB
    let r = parseInt(hex.substr(0, 2), 16) / 255;
    let g = parseInt(hex.substr(2, 2), 16) / 255;
    let b = parseInt(hex.substr(4, 2), 16) / 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    // Calculate hue
    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Convert to percentages
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
}

function saveThemePreference(color, isDark) {
    localStorage.setItem('themeColor', color);
    localStorage.setItem('isDarkMode', isDark);
}

function loadThemePreference() {
    const themeColorSelect = document.getElementById('themeColor');
    const themeModeToggle = document.getElementById('themeMode');
    const savedColor = localStorage.getItem('themeColor') || '#007bff'; // Default to blue if no saved color
    const savedIsDark = localStorage.getItem('isDarkMode') === 'true';
    
    themeColorSelect.value = savedColor;
    themeModeToggle.checked = savedIsDark;
    
    applyTheme(savedColor, savedIsDark);
}

function showCharacterSheet() {
    console.log('Showing character sheet');
    const startMenu = document.getElementById('startMenu');
    const characterCreator = document.getElementById('characterCreator');
    const characterSheet = document.getElementById('characterSheet');
    
    if (startMenu && characterCreator && characterSheet) {
        startMenu.classList.add('hidden');
        characterCreator.classList.add('hidden');
        characterSheet.classList.remove('hidden');
        updateCharacterSheet();
    } else {
        console.error('One or more required elements not found');
        if (!startMenu) console.error('Start menu element not found');
        if (!characterCreator) console.error('Character creator element not found');
        if (!characterSheet) console.error('Character sheet element not found');
    }
    
    if (typeof initializeOptionsSection === 'function') {
        initializeOptionsSection();
    } else {
        console.warn('initializeOptionsSection is not defined');
    }
}

function showCharacterCreator() {
    const header = document.querySelector('.header');
    const characterCreator = document.getElementById('characterCreator');
    const characterSheet = document.getElementById('characterSheet');
    const themeControls = document.getElementById('themeControls');

    if (header) {
        header.classList.remove('hidden');
    }
    characterCreator.classList.remove('hidden');
    characterSheet.classList.add('hidden');
    themeControls.style.display = ''; // Show theme controls again

    // Reset body padding
    document.body.style.paddingTop = '0';
}

function updateCharacterSheet() {
    console.log('Updating character sheet');
    console.log('Current character state:', character);
    console.log('Updating character sheet with new inventory:', character.inventory);
    console.log('Updating character sheet with new currency:', character.currency);

    try {
        // Basic information
        document.getElementById('sheetCharacterName').textContent = character.name || 'Unnamed Character';
        document.getElementById('sheetRaceClass').textContent = `${character.race || 'Unknown Race'} - Level ${character.level || 1} ${character.class || 'Unknown Class'} (${character.subclass || ''}) - ${character.alignment || 'Chaotic Good'}`;
        
        // Ability scores and saving throws
        if (document.getElementById('sheetAttributes')) {
            updateSheetAttributes();
        }
        
        // Skills
        if (document.getElementById('sheetSkills')) {
            updateSheetSkills();
        }
        
        // Combat stats
        const hpElement = document.getElementById('sheetHP');
        if (hpElement) hpElement.textContent = `${character.hp || 0}/${character.maxHp || 0}`;
        
        const acElement = document.getElementById('sheetAC');
        if (acElement) acElement.textContent = character.ac || 10;
        
        const initiativeElement = document.getElementById('sheetInitiative');
        if (initiativeElement) {
            const initiative = character.initiative || 0;
            initiativeElement.textContent = initiative >= 0 ? `+${initiative}` : initiative;
        }
        
        // Update Hit Dice display
        const hitDiceElement = document.getElementById('hitDice');
        if (hitDiceElement) {
            hitDiceElement.textContent = `Hit Dice: ${character.currentHitDice}d${character.hitDie.faces}`;
        }

        // Other characteristics
        const speedElement = document.getElementById('sheetSpeed');
        if (speedElement) speedElement.textContent = character.speed || 30;
        
        const profBonusElement = document.getElementById('sheetProficiencyBonus');
        if (profBonusElement) profBonusElement.textContent = `+${character.proficiencyBonus || 2}`;
        
        // Equipment and Inventory
        if (document.getElementById('inventoryList')) {
            updateEquipmentList();
        }
        
        // Features and Traits
        updateFeaturesAndTraits();
        
        if (document.getElementById('spellcastingSection')) {
            character.spellcasting.spellSlots = calculateSpellSlots(character.class.toLowerCase(), character.level);
            // Reset current spell slots to max
            for (let level in character.spellcasting.spellSlots) {
                character.spellcasting.currentSpellSlots[level] = character.spellcasting.spellSlots[level];
            }
            initializeSpellcasting();
            updateSpellcastingUI();
        }

        if (character.spellcasting) {
            updateSpellcastingUI();
        }
        
        // Notes
        const notesElement = document.getElementById('characterNotes');
        if (notesElement) notesElement.value = character.notes || '';
        
        // Currency
        updateCurrencyDisplay();

        updateHPDisplay();
        updateInitiativeDisplay();
        
        console.log('Character sheet updated successfully');
    } catch (error) {
        console.error('Error updating character sheet:', error);
    }
}

function updateCurrencyDisplay() {
    const currencies = ['copper', 'silver', 'electrum', 'gold', 'platinum'];
    currencies.forEach(currency => {
        const input = document.getElementById(`${currency}Input`);
        if (input) {
            input.value = character.currency[currency] || 0;
        }
    });
}

function updateEquipmentList() {
    const inventoryList = document.getElementById('inventoryList');
    if (!inventoryList) {
        console.warn('Inventory list element not found');
        return;
    }
    inventoryList.innerHTML = '';
    if (character.inventory && Array.isArray(character.inventory)) {
        character.inventory.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            if (item.damage) {
                li.textContent += ` (${item.damage})`;
            }
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeItemFromInventory(item);
            li.appendChild(removeButton);
            inventoryList.appendChild(li);
        });
    }
}

function updateFeaturesAndTraits() {
    const featuresList = document.getElementById('featuresList');
    if (!featuresList) {
        console.warn('Features list element not found. Skipping features and traits update.');
        return;
    }

    featuresList.innerHTML = '';
    
    // Combine features and traits
    const allFeatures = [
        ...(character.features || []),
        ...(character.traits || [])
    ];

    allFeatures.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    // If there are no features or traits, display a message
    if (allFeatures.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No features or traits available.';
        featuresList.appendChild(li);
    }}

    function updateSpellcastingUI() {
        initializeSpellcasting();
        
        const spellSlotsDiv = document.getElementById('spellSlots');
        if (!spellSlotsDiv) {
            console.error('Spell slots div not found');
            return;
        }
    
        // Clear existing content
        spellSlotsDiv.innerHTML = '<h4>Spell Slots:</h4>';
    
        // Create spell slot row if it doesn't exist
        let spellSlotRow = spellSlotsDiv.querySelector('.spell-slot-row');
        if (!spellSlotRow) {
            spellSlotRow = document.createElement('div');
            spellSlotRow.classList.add('spell-slot-row');
            spellSlotsDiv.appendChild(spellSlotRow);
        }
        
        spellSlotRow.innerHTML = ''; // Clear existing spell slots
        
        for (let i = 1; i <= 9; i++) {
            if (character.spellcasting.spellSlots[i] > 0) {
                const slotDiv = document.createElement('div');
                slotDiv.classList.add('spell-slot');
                slotDiv.innerHTML = `
                    <span>${i}:</span>
                    <button class="spell-slot-button" data-level="${i}">
                        ${character.spellcasting.currentSpellSlots[i]}/${character.spellcasting.spellSlots[i]}
                    </button>
                `;
                spellSlotRow.appendChild(slotDiv);
            }
        }
    
        // Populate spell dropdown
        const spellSelect = document.getElementById('spellSelect');
        if (spellSelect) {
            spellSelect.innerHTML = '<option value="">Select a spell</option>';
            spells.filter(spell => spell.classes.includes(character.class))
                .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name))
                .forEach(spell => {
                    const option = document.createElement('option');
                    option.value = spell.name;
                    option.textContent = `${spell.name} (Level ${spell.level})`;
                    spellSelect.appendChild(option);
                });
        }
    
        updateSpellList();
    }
    
    function updateSpellList() {
        const spellListDiv = document.getElementById('spellList');
        spellListDiv.innerHTML = '';
        spellLevels.forEach((level, index) => {
            const levelDiv = document.createElement('div');
            levelDiv.innerHTML = `<h4 id="spellLevel${index}">${level}</h4>`;
            const levelSpells = character.spellcasting.spells.filter(spell => 
                (level === 'Cantrips' && spell.level === 0) || 
                (level !== 'Cantrips' && spell.level === spellLevels.indexOf(level))
            );
            levelSpells.forEach(spell => {
                const spellButton = document.createElement('button');
                spellButton.classList.add('spell-chevron');
                spellButton.innerHTML = `
                    ${spell.name}
                    <div class="spell-details hidden">
                        <p>Level: ${spell.level}</p>
                        <p>${spell.description}</p>
                    </div>
                `;
                spellButton.addEventListener('click', () => toggleSpellDetails(spellButton));
                
                const castButton = document.createElement('button');
                castButton.textContent = 'Cast';
                castButton.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent triggering the spell details toggle
                    castSpell(spell);
                });
                
                const spellContainer = document.createElement('div');
                spellContainer.classList.add('spell-container');
                spellContainer.appendChild(spellButton);
                spellContainer.appendChild(castButton);
                
                levelDiv.appendChild(spellContainer);
            });
            spellListDiv.appendChild(levelDiv);
        });
    }
    
    function toggleSpellDetails(button) {
        const details = button.querySelector('.spell-details');
        details.classList.toggle('hidden');
    }
    
    function castSpell(spell) {
        if (spell.level === 0) {
            console.log("Casting cantrip, no spell slot used.");
            return; // Cantrips don't use spell slots
        }
    
        let slotToUse = spell.level;
        const isWarlock = character.class.toLowerCase() === 'warlock';
    
        if (isWarlock) {
            // For Warlocks, find the lowest level available slot
            for (let i = spell.level; i <= 5; i++) {
                if (character.spellcasting.currentSpellSlots[i] > 0) {
                    slotToUse = i;
                    break;
                }
            }
        }
    
        if (character.spellcasting.currentSpellSlots[slotToUse] > 0) {
            character.spellcasting.currentSpellSlots[slotToUse]--;
            console.log(`Cast ${spell.name} using level ${slotToUse} slot. Remaining slots: ${character.spellcasting.currentSpellSlots[slotToUse]}`);
            updateSpellSlotDisplay();
        } else {
            console.log(`No spell slots available for ${spell.name} (level ${spell.level})`);
            alert('No spell slots available for this spell!');
        }
    }
    
    function updateSpellSlotDisplay() {
        const spellSlotRow = document.querySelector('.spell-slot-row');
        if (!spellSlotRow) return;
    
        for (let i = 1; i <= 9; i++) {
            const slotButton = spellSlotRow.querySelector(`[data-level="${i}"]`);
            if (slotButton) {
                const maxSlots = character.spellcasting.spellSlots[i] || 0;
                const currentSlots = character.spellcasting.currentSpellSlots[i] || 0;
                slotButton.textContent = `${currentSlots}/${maxSlots}`;
            }
        }
    }
    
    function addSpellToCharacter() {
        const spellName = document.getElementById('spellSelect').value;
        const spell = spells.find(s => s.name === spellName);
        if (spell && !character.spellcasting.spells.some(s => s.name === spell.name)) {
            character.spellcasting.spells.push(spell);
            updateSpellList();
        }
    }
    
    function updateHPDisplay() {
        const hpElement = document.getElementById('sheetHP');
        if (hpElement) hpElement.textContent = `${character.hp}/${character.maxHp}`;
    }
    
    function updateInitiativeDisplay() {
        const initiativeModifier = character.initiative || 0;
        const rollInitiativeButton = document.getElementById('rollInitiativeButton');
        if (rollInitiativeButton) {
            rollInitiativeButton.textContent = initiativeModifier >= 0 ? `+${initiativeModifier}` : initiativeModifier;
        }
    }
    
    function updateCurrency() {
        const currencies = ['copper', 'silver', 'electrum', 'gold', 'platinum'];
        currencies.forEach(currency => {
            const input = document.getElementById(`${currency}Input`);
            if (input) {
                character.currency[currency] = parseInt(input.value) || 0;
            }
        });
        updateCharacterSheet();
    }
    
    function calculateSpellSlots(characterClass, level) {
        const fullCasters = ['wizard', 'sorcerer', 'bard', 'cleric', 'druid'];
        const halfCasters = ['paladin', 'ranger'];
        const artificer = 'artificer';
        const warlock = 'warlock';
    
        let slots = {
            1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
        };
    
        if (fullCasters.includes(characterClass)) {
            const effectiveLevel = level;
            if (effectiveLevel >= 1) slots[1] = effectiveLevel >= 1 ? 2 : 0;
            if (effectiveLevel >= 2) slots[1] = 3;
            if (effectiveLevel >= 3) { slots[1] = 4; slots[2] = 2; }
            if (effectiveLevel >= 4) slots[2] = 3;
            if (effectiveLevel >= 5) { slots[1] = 4; slots[2] = 3; slots[3] = 2; }
            if (effectiveLevel >= 6) slots[3] = 3;
            if (effectiveLevel >= 7) { slots[4] = 1; }
            if (effectiveLevel >= 8) slots[4] = 2;
            if (effectiveLevel >= 9) { slots[4] = 3; slots[5] = 1; }
            if (effectiveLevel >= 10) slots[5] = 2;
            if (effectiveLevel >= 11) slots[6] = 1;
            if (effectiveLevel >= 13) slots[7] = 1;
            if (effectiveLevel >= 15) slots[8] = 1;
            if (effectiveLevel >= 17) slots[9] = 1;
            if (effectiveLevel >= 18) slots[5] = 3;
            if (effectiveLevel >= 19) slots[6] = 2;
            if (effectiveLevel >= 20) slots[7] = 2;
        } else if (halfCasters.includes(characterClass)) {
            const effectiveLevel = Math.ceil(level / 2);
            if (effectiveLevel >= 2) slots[1] = 2;
            if (effectiveLevel >= 3) slots[1] = 3;
            if (effectiveLevel >= 5) { slots[1] = 4; slots[2] = 2; }
            if (effectiveLevel >= 7) slots[2] = 3;
            if (effectiveLevel >= 9) { slots[3] = 2; }
            if (effectiveLevel >= 11) slots[3] = 3;
            if (effectiveLevel >= 13) slots[4] = 1;
            if (effectiveLevel >= 15) slots[4] = 2;
            if (effectiveLevel >= 17) { slots[4] = 3; slots[5] = 1; }
            if (effectiveLevel >= 19) slots[5] = 2;
        } else if (characterClass === artificer) {
            const effectiveLevel = Math.ceil(level / 2);
            if (effectiveLevel >= 1) slots[1] = 2;
            if (effectiveLevel >= 2) slots[1] = 2;
            if (effectiveLevel >= 3) { slots[1] = 3; slots[2] = 2; }
            if (effectiveLevel >= 4) slots[2] = 2;
            if (effectiveLevel >= 5) { slots[1] = 4; slots[2] = 3; slots[3] = 2; }
            if (effectiveLevel >= 7) slots[3] = 3;
            if (effectiveLevel >= 9) { slots[3] = 3; slots[4] = 1; }
            if (effectiveLevel >= 11) slots[4] = 2;
            if (effectiveLevel >= 13) slots[4] = 3;
            if (effectiveLevel >= 15) slots[5] = 1;
            if (effectiveLevel >= 17) slots[5] = 2;
            if (effectiveLevel >= 19) slots[5] = 2;
        } else if (characterClass === warlock) {
            const pactMagicSlots = Math.min(Math.floor((level + 1) / 2), 4);
            const pactMagicLevel = Math.min(Math.floor((level - 1) / 6) + 1, 5);
            for (let i = 1; i <= pactMagicLevel; i++) {
                slots[i] = pactMagicSlots;
            }
        }
    
        return slots;
    }
    
    function initializeSpellcasting() {
        if (!character.spellcasting) {
            character.spellcasting = {
                class: character.class || '',
                ability: '',  // This should be set based on the class
                spellSaveDC: 0,
                spellAttackBonus: 0,
                spells: [],
                spellSlots: calculateSpellSlots(character.class.toLowerCase(), character.level),
                currentSpellSlots: {}
            };
        }
        // Initialize or reset current spell slots
        for (let i = 1; i <= 9; i++) {
            character.spellcasting.currentSpellSlots[i] = character.spellcasting.spellSlots[i] || 0;
        }
    }
    
    function updateSheetAttributes() {
        console.log('Updating sheet attributes');
        const sheetAttributes = document.getElementById('sheetAttributes');
        sheetAttributes.innerHTML = '';
        Object.entries(character.abilityScores).forEach(([ability, score]) => {
            const modifier = Math.floor((score - 10) / 2);
            const modifierString = modifier >= 0 ? `+${modifier}` : `${modifier}`;
            
            const isProficientInSave = character.savingThrows[ability].proficient;
            const savingThrowBonus = isProficientInSave ? modifier + character.proficiencyBonus : modifier;
            const savingThrowString = savingThrowBonus >= 0 ? `+${savingThrowBonus}` : `${savingThrowBonus}`;
    
            const attributeBox = document.createElement('div');
            attributeBox.classList.add('attribute-box');
            attributeBox.innerHTML = `
                <div class="attribute-name">${ability.charAt(0).toUpperCase() + ability.slice(1)}</div>
                <div class="attribute-score">${score}</div>
                <button class="roll-button attribute-check" data-ability="${ability}" data-modifier="${modifier}">
                    Check (${modifierString})
                </button>
                <button class="roll-button attribute-save" data-ability="${ability}" data-bonus="${savingThrowBonus}">
                    Save (${savingThrowString})
                    ${isProficientInSave ? '<span class="proficient-marker">●</span>' : ''}
                </button>
            `;
            sheetAttributes.appendChild(attributeBox);
        });
    
        // Add event listeners to the roll buttons
        sheetAttributes.querySelectorAll('.roll-button').forEach(button => {
            button.addEventListener('click', handleAttributeRoll);
        });
    }
    
    function updateSheetSkills() {
        const sheetSkills = document.getElementById('sheetSkills');
        sheetSkills.innerHTML = '';
        Object.entries(skillAbilityMap).forEach(([skillName, associatedAbility]) => {
            if (!character.skills[skillName]) {
                character.skills[skillName] = { proficient: false, bonus: 0 };
            }
    
            const skillInfo = character.skills[skillName];
            const abilityScore = character.abilityScores[associatedAbility] || 10;
            const abilityModifier = Math.floor((abilityScore - 10) / 2);
            const totalBonus = skillInfo.proficient ? abilityModifier + character.proficiencyBonus : abilityModifier;
            const bonusString = totalBonus >= 0 ? `+${totalBonus}` : `${totalBonus}`;
            
            const skillBox = document.createElement('div');
            skillBox.classList.add('skill-box');
            skillBox.innerHTML = `
            <div class="skill-name">${skillName}</div>
            <div class="skill-ability">(${associatedAbility.charAt(0).toUpperCase() + associatedAbility.slice(1)})</div>
            <button class="skill-bonus roll-button" data-skill="${skillName}" data-bonus="${totalBonus}">${bonusString}</button>
            ${skillInfo.proficient ? '<span class="proficient-marker">●</span>' : ''}
        `;
        sheetSkills.appendChild(skillBox);
    });

    // Add event listeners to the roll buttons
    sheetSkills.querySelectorAll('.roll-button').forEach(button => {
        button.addEventListener('click', handleSkillRoll);
    });
}

function handleAttributeRoll(event) {
    const button = event.currentTarget;
    const ability = button.dataset.ability;
    const isCheck = button.classList.contains('attribute-check');
    const modifier = parseInt(isCheck ? button.dataset.modifier : button.dataset.bonus);
    
    const roll = rollD20();
    const total = roll + modifier;
    
    const rollType = isCheck ? 'Check' : 'Saving Throw';
    showNotification(`${ability} ${rollType}: ${roll} + ${modifier} = ${total}`);
}

function handleSkillRoll(event) {
    const skill = event.target.dataset.skill;
    const bonus = parseInt(event.target.dataset.bonus);
    const roll = rollD20();
    const total = roll + bonus;
    showNotification(`${skill} Check: ${roll} + ${bonus} = ${total}`);
}

function checkAbilityScoreImprovement() {
    if ([4, 8, 12, 16, 19].includes(character.level)) {
        console.log('Ability Score Improvement available');
        // Implement ability score improvement logic here
    }
}

function navigateSection(direction) {
    currentSectionIndex += direction;
    if (currentSectionIndex < 0) currentSectionIndex = sections.length - 1;
    if (currentSectionIndex >= sections.length) currentSectionIndex = 0;

    sections.forEach((section, index) => {
        document.getElementById(section).classList.toggle('hidden', index !== currentSectionIndex);
    });

    updateSectionName();
}

function updateSectionName() {
    const sectionName = sections[currentSectionIndex].replace('Section', '');
    const capitalizedSectionName = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
    document.getElementById('currentSection').textContent = capitalizedSectionName;
}

function initializeCharacterSheet() {
    currentSectionIndex = 0;
    updateSectionName();
    sections.forEach((section, index) => {
        document.getElementById(section).classList.toggle('hidden', index !== 0);
    });
    updateSheetAttributes();
    updateSheetSkills();
    updateSpellcastingUI();
}

function generateRandomCharacter() {
    console.log('Generating random character...');

    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

    // Generate random race
    const raceNames = Object.keys(races);
    const randomRace = getRandomItem(raceNames);
    console.log('Selected random race:', randomRace);
    if (raceSelect) raceSelect.value = randomRace;
    const raceTraits = races[randomRace]?.traits || {};
    character.race = randomRace;

    // Generate random class
    const randomClass = getRandomItem(classes);
    console.log('Selected random class:', randomClass.name);
    if (classSelect) classSelect.value = randomClass.name;
    character.class = randomClass.name;

    // Set hit die information
    character.hitDie.faces = randomClass.hd.faces;
    character.currentHitDice = character.level;

    // Generate random name
    character.name = generateRandomName();
    console.log('Generated random name:', character.name);
    if (nameInput) nameInput.value = character.name;

    // Set random level (1-20)
    character.level = Math.floor(Math.random() * 20) + 1;
    if (levelInput) levelInput.value = character.level;

    // Generate random ability scores
    abilityScores.forEach(ability => {
        const scores = Array(4).fill().map(() => Math.floor(Math.random() * 6) + 1);
        const total = scores.sort((a, b) => b - a).slice(0, 3).reduce((sum, score) => sum + score, 0);
        const finalScore = total + (raceTraits.abilityScoreIncrease?.[ability.toLowerCase()] || 0);
        character.abilityScores[ability.toLowerCase()] = finalScore;
    });

    // Update ability modifiers
    Object.keys(character.abilityScores).forEach(updateAbilityModifier);

    // Update subclass options
    updateSubclassSelect();
    if (subclassSelect && subclassSelect.options.length > 1) {
        const randomSubclassIndex = Math.floor(Math.random() * (subclassSelect.options.length - 1)) + 1;
        subclassSelect.selectedIndex = randomSubclassIndex;
        character.subclass = subclassSelect.options[randomSubclassIndex].value;
    }

    // Calculate HP, AC, and Initiative
    const conModifier = Math.floor((character.abilityScores.constitution - 10) / 2);
    const hitDice = getHitDiceByClass(character.class);
    character.maxHp = hitDice + conModifier + ((character.level - 1) * (Math.floor(hitDice / 2) + 1 + conModifier));
    character.hp = character.maxHp;

    const dexModifier = Math.floor((character.abilityScores.dexterity - 10) / 2);
    character.ac = 10 + dexModifier;
    character.initiative = dexModifier;

    // Set alignment randomly
    const alignments = ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'];
    character.alignment = getRandomItem(alignments);

    // Update class features and race traits
    updateClassFeatures();
    updateRaceTraits();

    // Randomly select proficient skills
    const availableSkills = Object.keys(skillAbilityMap);
    const numSkills = 2 + (raceTraits.extraSkills || 0);
    const proficientSkills = [];
    for (let i = 0; i < numSkills; i++) {
        const skill = getRandomItem(availableSkills.filter(s => !proficientSkills.includes(s)));
        proficientSkills.push(skill);
    }

    // Update skill proficiencies
    availableSkills.forEach(skill => {
        character.skills[skill.toLowerCase().replace(/\s+/g, '')] = { 
            proficient: proficientSkills.includes(skill), 
            expertise: false 
        };
    });

    // Set proficiency bonus based on level
    character.proficiencyBonus = Math.ceil(1 + (character.level / 4));

    // Set speed (default to 30, but should be adjusted based on race)
    character.speed = raceTraits.speed || 30;

    console.log('Random character generation complete');
    console.log('Generated character:', character);

    updateCharacterSheet();
    showCharacterSheet();
}

function saveCharacterToJson() {
    const characterData = { ...character };
    characterData.spellcasting.spells = character.spellcasting.spells.map(spell => spell.name);
    const characterJson = JSON.stringify(characterData, null, 2);
    const blob = new Blob([characterJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.name || 'character'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function loadCharacterFromJson() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const loadedCharacter = JSON.parse(e.target.result);
                Object.assign(character, loadedCharacter);
                
                // Process spellcasting data
                if (character.spellcasting && character.spellcasting.spells) {
                    character.spellcasting.spells = character.spellcasting.spells.map(spellName => 
                        spells.find(spell => spell.name === spellName)
                    ).filter(spell => spell !== undefined);
                }
                
                updateCharacterSheet();
                showCharacterSheet();
                console.log('Character loaded successfully');
            } catch (error) {
                console.error('Error loading character:', error);
                alert('Error loading character. Please check the file format.');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function resetCharacter() {
    Object.keys(character).forEach(key => {
        if (typeof character[key] === 'object' && character[key] !== null) {
            Object.keys(character[key]).forEach(subKey => {
                if (typeof character[key][subKey] === 'object' && character[key][subKey] !== null) {
                    Object.keys(character[key][subKey]).forEach(subSubKey => {
                        character[key][subKey][subSubKey] = false;
                    });
                } else {
                    character[key][subKey] = 0;
                }
            });
        } else if (Array.isArray(character[key])) {
            character[key] = [];
        } else if (typeof character[key] === 'string') {
            character[key] = '';
        } else if (typeof character[key] === 'number') {
            character[key] = 0;
        }
    });
    character.level = 1;
    character.ac = 10;
    character.proficiencyBonus = 2;
    character.speed = 30;
    // Reset ability scores to 10
    Object.keys(character.abilityScores).forEach(ability => {
        character.abilityScores[ability] = 10;
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements
    initializeDOMElements();

    // Add event listeners
    if (startButton) startButton.addEventListener('click', startCharacterCreation);
    if (randomCharacterButton) randomCharacterButton.addEventListener('click', generateRandomCharacter);
    if (nameInput) nameInput.addEventListener('input', () => updateCharInfo('name'));
    if (raceSelect) raceSelect.addEventListener('change', () => updateCharInfo('race'));
    if (classSelect) classSelect.addEventListener('change', () => updateCharInfo('class'));
    if (subclassSelect) subclassSelect.addEventListener('change', () => updateCharInfo('subclass'));
    if (levelInput) levelInput.addEventListener('input', () => updateCharInfo('level'));
    if (saveCharacterButton) saveCharacterButton.addEventListener('click', showCharacterSheet);
    if (randomNameButton) randomNameButton.addEventListener('click', () => {
        nameInput.value = generateRandomName();
    });
    if (restButton) {
        restButton.addEventListener('click', () => {
            restModal.style.display = 'block';
        });
    }
    if (closeRestModal) {
        closeRestModal.addEventListener('click', () => {
            restModal.style.display = 'none';
        });
    }
    if (shortRestButton) {
        shortRestButton.addEventListener('click', () => {
            shortRest();
            restModal.style.display = 'none';
        });
    }
    if (longRestButton) {
        longRestButton.addEventListener('click', () => {
            longRest();
            restModal.style.display = 'none';
        });
    }
    if (prevSectionButton) prevSectionButton.addEventListener('click', () => navigateSection(-1));
    if (nextSectionButton) nextSectionButton.addEventListener('click', () => navigateSection(1));
    if (rollInitiativeButton) {
        rollInitiativeButton.addEventListener('click', () => {
            const initiativeModifier = character.initiative || 0;
            const roll = rollD20();
            const total = roll + initiativeModifier;
            showNotification(`Initiative Roll: ${roll} + ${initiativeModifier} = ${total}`);
        });
    }
    if (modifyHPButton) {
        modifyHPButton.addEventListener('click', () => {
            hpModal.style.display = 'block';
        });
    }
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            hpModal.style.display = 'none';
        });
    }
    if (healButton) {
        healButton.addEventListener('click', () => {
            const amount = parseInt(hpChangeAmount.value) || 0;
            character.hp = Math.min(character.hp + amount, character.maxHp);
            updateHPDisplay();
            hpModal.style.display = 'none';
        });
    }
    if (damageButton) {
        damageButton.addEventListener('click', () => {
            const amount = parseInt(hpChangeAmount.value) || 0;
            character.hp = Math.max(character.hp - amount, 0);
            updateHPDisplay();
            hpModal.style.display = 'none';
        });
    }
    if (addSpellButton) {
        addSpellButton.addEventListener('click', addSpellToCharacter);
    }
    if (characterNotes) {
        characterNotes.addEventListener('input', () => {
            character.notes = characterNotes.value;
        });
    }
    if (saveCharacterJsonButton) {
        saveCharacterJsonButton.addEventListener('click', saveCharacterToJson);
    }
    if (loadCharacterJsonButton) {
        loadCharacterJsonButton.addEventListener('click', loadCharacterFromJson);
    }
    if (returnToCreatorButton) {
        returnToCreatorButton.addEventListener('click', showCharacterCreator);
    }
    if (levelUpButton) {
        levelUpButton.addEventListener('click', () => {
            character.level++;
            checkAbilityScoreImprovement();
            updateCharacterSheet();
        });
    }
    if (themeColorSelect) {
        themeColorSelect.addEventListener('change', (e) => {
            const newColor = e.target.value;
            const isDark = themeModeToggle.checked;
            applyTheme(newColor, isDark);
            saveThemePreference(newColor, isDark);
        });
    }
    if (themeModeToggle) {
        themeModeToggle.addEventListener('change', (e) => {
            const isDark = e.target.checked;
            const currentColor = themeColorSelect.value;
            applyTheme(currentColor, isDark);
            saveThemePreference(currentColor, isDark);
        });
    }
    if (addInventoryItemButton) {
        addInventoryItemButton.addEventListener('click', addInventoryItem);
    }
    if (updateCurrencyButton) {
        updateCurrencyButton.addEventListener('click', updateCurrency);
    }

    // Other event listeners
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('rollAbility') && !e.target.disabled) {
            e.preventDefault();
            handleRollAbility(e.target);
        } else if (e.target.classList.contains('roll-option')) {
            e.preventDefault();
            handleRollOption(e.target);
        }
    });

        // Add event listeners for navigation buttons
        document.querySelectorAll('.next-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent form submission
                showCard(currentCardIndex + 1);
            });
        });
    
        document.querySelectorAll('.prev-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent form submission
                showCard(currentCardIndex - 1);
            });
        });

    window.addEventListener('resize', adjustContentPadding);

    // Initialize the application
    init();
});

// Initialization function
function init() {
    initializeDOMElements();
    loadThemePreference();
    createAbilityScoreElements();
    showCard(-1); // Start by showing the start menu
    adjustContentPadding();
    loadInventoryData();
    initializeSpellcasting();
    updateSpellcastingUI();
    
    // Only update skills if the character sheet is visible
    if (!document.getElementById('characterSheet').classList.contains('hidden')) {
        updateSkillModifiers();
    }

    // Populate race and class selects
    populateRaceSelect();
    populateClassSelect();
}

// Data loading
Promise.all([
    fetch('races.json').then(response => response.json()),
    fetch('classes.json').then(response => response.json()),
    fetch('spells.json').then(response => response.json()),
    fetch('weapons.json').then(response => response.json()),
    fetch('armor.json').then(response => response.json()),
    fetch('items.json').then(response => response.json())
]).then(([racesData, classesData, spellsData, weaponsData, armorsData, itemsData]) => {
    races = sortRacesAlphabetically(racesData);
    classes = classesData;
    spells = spellsData;
    weapons = weaponsData;
    armors = armorsData;
    items = itemsData;

    // Store hit die information for each class
    classes.forEach(classData => {
        classData.hitDie = {
            number: classData.hd.number,
            faces: classData.hd.faces
        };
    });

    populateRaceSelect();
    populateClassSelect();
    populateDropdowns();
}).catch(error => console.error('Error loading data:', error));

// Helper functions
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function loadInventoryData() {
    populateDropdowns();
}

function populateDropdowns() {
    populateDropdown('weaponSelect', weapons);
    populateDropdown('armorSelect', armors);
    populateDropdown('itemSelect', items);
}

function populateDropdown(selectId, data) {
    const select = document.getElementById(selectId);
    if (select) {
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = item.name;
            select.appendChild(option);
        });
    }
}

function addInventoryItem() {
    const weaponSelect = document.getElementById('weaponSelect');
    const armorSelect = document.getElementById('armorSelect');
    const itemSelect = document.getElementById('itemSelect');

    [weaponSelect, armorSelect, itemSelect].forEach(select => {
        if (select && select.value !== "") {
            const selectedItem = getItemFromSelect(select);
            if (selectedItem) {
                addItemToInventory(selectedItem);
            }
        }
    });

    // Reset dropdowns
    if (weaponSelect) weaponSelect.value = "";
    if (armorSelect) armorSelect.value = "";
    if (itemSelect) itemSelect.value = "";
}

function getItemFromSelect(select) {
    const itemList = select.id === 'weaponSelect' ? weapons :
                     select.id === 'armorSelect' ? armors : items;
    return itemList.find(item => item.name === select.value);
}

function addItemToInventory(item) {
    const inventoryList = document.getElementById('inventoryList');
    if (!inventoryList) {
        console.warn('Inventory list element not found');
        return;
    }
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${item.name}</span>
        ${item.damage ? `<span>(${item.damage} ${item.damageType})</span>` : ''}
        ${item.ac ? `<span>(AC ${item.ac})</span>` : ''}
        <button class="remove-item">Remove</button>
    `;
    li.querySelector('.remove-item').addEventListener('click', () => removeItemFromInventory(item));
    inventoryList.appendChild(li);

    addItemToCharacter(item);
}

function removeItemFromInventory(item) {
    const inventoryList = document.getElementById('inventoryList');
    if (!inventoryList) {
        console.warn('Inventory list element not found');
        return;
    }
    const itemElement = Array.from(inventoryList.children).find(li => li.firstChild.textContent === item.name);
    if (itemElement) {
        inventoryList.removeChild(itemElement);
    }
    removeItemFromCharacter(item);
}

function addItemToCharacter(item) {
    if (!character.inventory) character.inventory = [];
    character.inventory.push(item);
    updateCharacterSheet();
}

function removeItemFromCharacter(item) {
    if (character.inventory) {
        const index = character.inventory.findIndex(i => i.name === item.name);
        if (index !== -1) {
            character.inventory.splice(index, 1);
            updateCharacterSheet();
        }
    }
}

// This is the end of the script
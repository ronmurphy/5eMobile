document.addEventListener('DOMContentLoaded', () => {

    let races = {};
    let classes = [];
    let weapons = [];
let armors = [];
let items = [];
    // let character = {}; // Ensure character object is defined globally
    // let abilityScores = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
    

    const abilityScores = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
    const skills = [
        'Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception',
        'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine',
        'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion',
        'Sleight of Hand', 'Stealth', 'Survival'
    ];


    let spells = [];
const spellLevels = ['Cantrips', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'];

    const character = {
        name: '',
        race: '',
        class: '',
        subclass: '',
        level: 1,
        hitDie: {
            number: 1,  // This will always be 1 for D&D 5e
            faces: 8    // Default to d8, will be updated based on class
        },
        maxHitDice: 1,  // This will always equal the character's level
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

    // character = initializeCharacter();

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
    const themeControls = document.getElementById('themeControls');
    const nameInput = document.getElementById('name');
    const classFeaturesList = document.getElementById('classFeaturesList');
    const raceTraitsList = document.getElementById('raceTraitsList');
    const themeColorSelect = document.getElementById('themeColor');
    const themeModeToggle = document.getElementById('themeMode');
    // sheet const and variables
    const characterSheet = document.getElementById('characterSheet');
    const sheetCharacterName = document.getElementById('sheetCharacterName');
    const sheetRaceClass = document.getElementById('sheetRaceClass');
    const sheetHP = document.getElementById('sheetHP');
    const sheetAC = document.getElementById('sheetAC');
    const sheetInitiative = document.getElementById('sheetInitiative');
    const sheetAttributes = document.getElementById('sheetAttributes');
    const sheetSkills = document.getElementById('sheetSkills');
    const prevSectionButton = document.getElementById('prevSection');
    const nextSectionButton = document.getElementById('nextSection');
    const currentSectionSpan = document.getElementById('currentSection');

    const characterNotes = document.getElementById('characterNotes');
    const saveCharacterJson = document.getElementById('saveCharacterJson');
    const returnToCreator = document.getElementById('returnToCreator');
    const levelUp = document.getElementById('levelUp');
    const themeColorEmbed = document.getElementById('themeColorEmbed');
    const themeModeEmbed = document.getElementById('themeModeEmbed');
    //const randomCharacterButton = document.getElementById('randomCharacter');
    const loadCharacterJson = document.getElementById('loadCharacterJson');
    const restButton = document.getElementById('restButton');
    const restModal = document.getElementById('restModal');
    const closeRestModal = document.getElementById('closeRestModal');

    // Add 'Options' to your sections array
    const sections = ['attributesSection', 'skillsSection', 'inventorySection', 'spellcastingSection', 'optionsSection'];    let currentSectionIndex = 0;
    let randomCharacterButton;

    const sheetSavingThrows = document.getElementById('sheetSavingThrows');
    
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


    const modifyHPButton = document.getElementById('modifyHPButton');
const hpModal = document.getElementById('hpModal');
const closeModal = document.getElementById('closeModal');
const healButton = document.getElementById('healButton');
const damageButton = document.getElementById('damageButton');
const hpChangeAmount = document.getElementById('hpChangeAmount');


const rollInitiativeButton = document.getElementById('rollInitiativeButton');



rollInitiativeButton.addEventListener('click', () => {
    const initiativeModifier = character.initiative || 0;
    const roll = rollD20();
    const total = roll + initiativeModifier;
    showNotification(`Initiative Roll: ${roll} + ${initiativeModifier} = ${total}`);
});

function updateInitiativeDisplay() {
    const initiativeModifier = character.initiative || 0;
    rollInitiativeButton.textContent = initiativeModifier >= 0 ? `+${initiativeModifier}` : initiativeModifier;
}





function updateHPDisplay() {
    const hpElement = document.getElementById('sheetHP');
    if (hpElement) hpElement.textContent = `${character.hp}/${character.maxHp}`;
}

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
        
        // Update the character object with the new ability score
        character.abilityScores[ability.toLowerCase()] = roll;
        
        updateAbilityModifier(ability);
        updateSkillModifiers();
    }

    function getModifierString(score) {
        const modifierTable = {
            1: -5, 2: -4, 3: -4, 4: -3, 5: -3, 6: -2, 7: -2, 8: -1, 9: -1,
            10: 0, 11: 0, 12: 1, 13: 1, 14: 2, 15: 2, 16: 3, 17: 3, 18: 4,
            19: 4, 20: 5, 21: 5, 22: 6, 23: 6, 24: 7, 25: 7, 26: 8, 27: 8,
            28: 9, 29: 9, 30: 10
        };
        const modifier = modifierTable[score] || 0;
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
                    character.notes += `${traitName}: ${value}\n`;
                }
            }
        }
    }

    function generateRandomName() {
        const names = ['Aragorn', 'Legolas', 'Gimli', 'Gandalf', 'Frodo', 'Samwise', 'Bilbo', 'Elrond', 'Galadriel', 'Thorin'];
        return names[Math.floor(Math.random() * names.length)];
    }

    function adjustContentPadding() {
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
    
    // Only call initializeOptionsSection if it's defined
    if (typeof initializeOptionsSection === 'function') {
        initializeOptionsSection();
    } else {
        console.warn('initializeOptionsSection is not defined');
    }
}

function sortRacesAlphabetically(races) {
    return Object.keys(races).sort().reduce((sortedRaces, race) => {
        sortedRaces[race] = races[race];
        return sortedRaces;
    }, {});
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
        sheetCharacterName.textContent = character.name || 'Unnamed Character';
        sheetRaceClass.textContent = `${character.race || 'Unknown Race'} - Level ${character.level || 1} ${character.class || 'Unknown Class'} (${character.subclass || ''}) - ${character.alignment || 'Chaotic Good'}`;
        
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

// Placeholder for updateSpellcasting function
function updateSpellcasting() {
    console.log('Updating spellcasting information');
    // TODO: Implement spell updating logic
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
    }
}

function updateSpellcasting() {
    if (character.spellcasting.class) {
        document.getElementById('spellcastingClass').textContent = character.spellcasting.class;
        document.getElementById('spellcastingAbility').textContent = character.spellcasting.ability;
        document.getElementById('spellSaveDC').textContent = character.spellcasting.spellSaveDC;
        document.getElementById('spellAttackBonus').textContent = character.spellcasting.spellAttackBonus;
        
        // Update spell list for each level
        for (let i = 0; i <= 9; i++) {
            const spellList = document.getElementById(`spellList${i}`);
            if (spellList) {
                spellList.innerHTML = '';
                const spells = i === 0 ? character.spells.cantrips : character.spells[`level${i}`];
                spells.forEach(spell => {
                    const li = document.createElement('li');
                    li.textContent = spell;
                    spellList.appendChild(li);
                });
            }
        }
    }
}

// function loadInventoryData() {
//     Promise.all([
//         fetch('weapons.json').then(response => response.json()),
//         fetch('armor.json').then(response => response.json()),
//         fetch('items.json').then(response => response.json())
//     ]).then(([weaponsData, armorsData, itemsData]) => {
//         weapons = weaponsData;
//         armors = armorsData;
//         items = itemsData;
//         populateDropdowns();
//     }).catch(error => console.error('Error loading inventory data:', error));
// }

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
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        select.appendChild(option);
    });
}

function addInventoryItem() {
    const weaponSelect = document.getElementById('weaponSelect');
    const armorSelect = document.getElementById('armorSelect');
    const itemSelect = document.getElementById('itemSelect');

    [weaponSelect, armorSelect, itemSelect].forEach(select => {
        if (select.value !== "") {
            const selectedItem = getItemFromSelect(select);
            if (selectedItem) {
                addItemToInventory(selectedItem);
            }
        }
    });

    // Reset dropdowns
    weaponSelect.value = "";
    armorSelect.value = "";
    itemSelect.value = "";
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

function updateSheetAttributes() {
    console.log('Updating sheet attributes');
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

function handleSavingThrowRoll(event) {
    const ability = event.target.dataset.ability;
    const bonus = parseInt(event.target.dataset.bonus);
    const roll = rollD20();
    const total = roll + bonus;
    showNotification(`${ability} Saving Throw: ${roll} + ${bonus} = ${total}`);
}

function handleSkillRoll(event) {
    const skill = event.target.dataset.skill;
    const bonus = parseInt(event.target.dataset.bonus);
    const roll = rollD20();
    const total = roll + bonus;
    showNotification(`${skill} Check: ${roll} + ${bonus} = ${total}`);
}

function checkAbilityScoreImprovement() {
    // Implement ability score improvement logic here
    if ([4, 8, 12, 16, 19].includes(character.level)) {
        // Prompt user for ability score improvement
        console.log('Ability Score Improvement available');
    }
}

function checkNewFeats() {
    // Placeholder for feat checking logic
    console.log('Checking for new feats');
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
    currentSectionSpan.textContent = capitalizedSectionName;
}

function initializeCharacterSheet() {
    currentSectionIndex = 0;
    updateSectionName();
    sections.forEach((section, index) => {
        document.getElementById(section).classList.toggle('hidden', index !== 0);
    });
    updateSheetAttributes();
    updateSheetSavingThrows();
    updateSheetSkills();
    updateSpellcastingUI();  // Add this line
}

prevSectionButton.addEventListener('click', () => navigateSection(-1));
    nextSectionButton.addEventListener('click', () => navigateSection(1));


    function rollD20() {
        return Math.floor(Math.random() * 20) + 1;
    }

    function createRollButton(text, modifier) {
        const button = document.createElement('button');
        button.classList.add('roll-button');
        button.innerHTML = `<strong>${text}</strong><div>${modifier}</div>`;
        button.addEventListener('click', () => {
            const roll = rollD20();
            const total = roll + parseInt(modifier);
            showNotification(`${text}: ${roll} + ${modifier} = ${total}`);
        });
        return button;
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

    function saveCharacterNotes() {
        // Assuming you have a character object
        character.notes = characterNotes.value;
    }

    function loadCharacterNotes() {
        // Assuming you have a character object
        characterNotes.value = character.notes || '';
    }

    function updateCharacterClass() {
        const selectedClass = classes.find(c => c.name === classSelect.value);
        if (selectedClass) {
            character.class = selectedClass.name;
            character.hitDie.faces = selectedClass.hd.faces;
            character.currentHitDice = character.level;
            updateClassFeatures();
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

    function rollDie(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }

    // document.addEventListener('DOMContentLoaded', function() {
    //     const shortRestButton = document.getElementById('shortRestButton');
    //     const longRestButton = document.getElementById('longRestButton');
    
    //     if (shortRestButton) {
    //         shortRestButton.addEventListener('click', function() {
    //             console.log('Short rest button clicked');
                
    //             if (character.currentHitDice <= 0) {
    //                 alert("You don't have any Hit Dice left to spend.");
    //                 return;
    //             }
    
    //             let hitDiceSpent = 0;
    //             const maxHitDice = character.currentHitDice;
    
    //             while (hitDiceSpent < maxHitDice) {
    //                 const wantToSpendHitDie = confirm(`Do you want to spend a Hit Die? (${hitDiceSpent} spent so far, ${character.currentHitDice} remaining)`);
    //                 if (!wantToSpendHitDie) break;
    
    //                 const hitDieRoll = Math.floor(Math.random() * character.hitDie.faces) + 1;
    //                 const conModifier = Math.floor((character.abilityScores.constitution - 10) / 2);
    //                 const hpRegained = hitDieRoll + conModifier;
    
    //                 character.hp = Math.min(character.hp + hpRegained, character.maxHp);
    //                 hitDiceSpent++;
    //                 character.currentHitDice--;
    
    //                 alert(`You regained ${hpRegained} hit points. Current HP: ${character.hp}/${character.maxHp}`);
    //             }
    
    //             updateCharacterSheet();
    //         });
    //     } else {
    //         console.error('Short rest button not found');
    //     }
    
    //     if (longRestButton) {
    //         longRestButton.addEventListener('click', function() {
    //             console.log('Long rest button clicked');
                
    //             // Restore hit points to maximum
    //             character.hp = character.maxHp;
    
    //             // Restore spell slots
    //             if (character.spellcasting) {
    //                 for (let level in character.spellcasting.spellSlots) {
    //                     character.spellcasting.currentSpellSlots[level] = character.spellcasting.spellSlots[level];
    //                 }
    //             }
    
    //             // Restore half of max Hit Dice (minimum of 1)
    //             const hitDiceRestored = Math.max(1, Math.floor(character.level / 2));
    //             character.currentHitDice = Math.min(character.level, character.currentHitDice + hitDiceRestored);
    
    //             updateCharacterSheet();
    //             alert("You've completed a long rest. Your hit points are restored to maximum, spell slots are refreshed, and you've regained some Hit Dice.");
    //         });
    //     } else {
    //         console.error('Long rest button not found');
    //     }
    // });

    shortRestButton.addEventListener('click', function() {
        // alert('Short rest button clicked');
        shortRest();
    });
    
    longRestButton.addEventListener('click', function() {
        // alert('Long rest button clicked');
        longRest();
    });
 
    function generateRandomCharacter() {
        console.log('Generating random character...');
    
        const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
    
        // Generate random race
        const raceNames = Object.keys(races);
        const randomRace = getRandomItem(raceNames);
        console.log('Selected random race:', randomRace);
        if (raceSelect) raceSelect.value = randomRace;
        const raceTraits = races[randomRace].traits;
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
        const nameInput = document.getElementById('name');
        if (nameInput) nameInput.value = character.name;
    
        // Set random level (1-20)
        character.level = Math.floor(Math.random() * 20) + 1;
        const levelInput = document.getElementById('level');
        if (levelInput) levelInput.value = character.level;
    
        // Generate random ability scores
        abilityScores.forEach(ability => {
            const scores = Array(4).fill().map(() => Math.floor(Math.random() * 6) + 1);
            const total = scores.sort((a, b) => b - a).slice(0, 3).reduce((sum, score) => sum + score, 0);
            const finalScore = total + (raceTraits.abilityScoreIncrease?.[ability.toLowerCase()] || 0);
            character.abilityScores[ability.toLowerCase()] = finalScore;
            
            const abilityButton = document.querySelector(`[data-ability="${ability.toLowerCase()}"]`);
            if (abilityButton) {
                abilityButton.textContent = `${ability}: ${finalScore}`;
                abilityButton.dataset.value = finalScore;
                abilityButton.disabled = true;
            }
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

    // Modify the initializeRandomCharacterButton function
    function initializeRandomCharacterButton() {
        const randomCharacterButton = document.getElementById('randomCharacter');
        if (randomCharacterButton) {
            // Remove any existing event listeners
            randomCharacterButton.removeEventListener('click', handleRandomCharacterClick);
            // Add the new event listener
            randomCharacterButton.addEventListener('click', handleRandomCharacterClick);
        } else {
            console.error('Random Character button not found in the DOM');
        }
    }
    
    // Create a separate function to handle the click event
    function handleRandomCharacterClick(event) {
        event.preventDefault();
        console.log('Random Character button clicked');
        try {
            generateRandomCharacter();
        } catch (error) {
            console.error('Error generating random character:', error);
        }
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
                    updateCharacterSheet();
                    showCharacterSheet();
                } catch (error) {
                    console.error('Error loading character:', error);
                    alert('Error loading character. Please check the file format.');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function initializeOptionsSection() {
        const characterNotes = document.getElementById('character-notes');
        if (characterNotes) {
            characterNotes.value = character.notes || '';
        }
    
        const themeColorSelect = document.getElementById('color-theme');
        const darkModeToggle = document.getElementById('dark-mode-toggle');
    
        if (themeColorSelect && darkModeToggle) {
            themeColorSelect.value = getCookie('colorTheme') || 'default';
            darkModeToggle.checked = getCookie('darkMode') === 'true';
        }
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
    
// Load character from JSON file
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
    
    // Event listeners for save and load buttons
    document.getElementById('saveCharacterJson').addEventListener('click', saveCharacterToJson);
    document.getElementById('loadCharacterJson').addEventListener('click', loadCharacterFromJson);
    

    // Add these event listeners
restButton.addEventListener('click', () => {
    restModal.style.display = 'block';
});

closeRestModal.addEventListener('click', () => {
    restModal.style.display = 'none';
});

// Modify the existing short rest and long rest button event listeners
shortRestButton.addEventListener('click', () => {
    shortRest();
    restModal.style.display = 'none';
});

longRestButton.addEventListener('click', () => {
    longRest();
    restModal.style.display = 'none';
});

// The shortRest and longRest functions can remain the same

// You may want to add this function to close the modal if the user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target === restModal) {
        restModal.style.display = 'none';
    }
});

    function updateCharInfo(field) {
        console.log(`Updating character info for field: ${field}`);
        
        const getElement = (id) => {
            const element = document.getElementById(id);
            if (!element) {
                console.warn(`Element with id '${id}' not found.`);
            }
            return element;
        };
    
        // switch (field) {
            // case 'name':
            //     const nameInput = getElement('name');
            //     if (nameInput) {
            //         character.name = nameInput.value;
            //     }
            //     break;
    
            // case 'race':
            //     character.race = raceSelect.value;
            //     // Append racial abilities/traits to notes if they aren't dedicated fields
            //     const raceTraits = races[character.race]?.traits || {};
            //     character.notes += `Racial Traits for ${character.race}: ${JSON.stringify(raceTraits)}\n`;
            //     break;
    
            // case 'class':
            //     character.class = classSelect.value;
            //     // Optionally add class features to notes if not handled elsewhere
            //     const classFeatures = classes[character.class]?.features || {};
            //     character.notes += `Class Features for ${character.class}: ${JSON.stringify(classFeatures)}\n`;
            //     break;
    
            // case 'subclass':
            //     character.subclass = subclassSelect.value;
            //     // Optionally add subclass features to notes
            //     const subclassFeatures = classes[character.class]?.subclasses[character.subclass]?.features || {};
            //     character.notes += `Subclass Features for ${character.subclass}: ${JSON.stringify(subclassFeatures)}\n`;
            //     break;
    
            // case 'level':
            //     const levelInput = getElement('level');
            //     if (levelInput) {
            //         character.level = parseInt(levelInput.value) || 1;
            //     }
            //     break;

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
    
            case 'hp':
                const hpInput = getElement('hp');
                if (hpInput) {
                    character.hp = parseInt(hpInput.value) || 10;
                }
                break;
    
            case 'abilityScores':
                abilityScores.forEach(ability => {
                    const abilityButton = document.querySelector(`[data-ability="${ability.toLowerCase()}"]`);
                    if (abilityButton) {
                        const score = parseInt(abilityButton.dataset.value);
                        character.abilityScores[ability.toLowerCase()] = score;
                    }
                });
                break;
    
            case 'skills':
                const skillElements = document.querySelectorAll('.skill');
                skillElements.forEach(skillElement => {
                    const skillName = skillElement.getAttribute('data-skill')?.toLowerCase();
                    if (skillName) {
                        const proficient = skillElement.querySelector('.proficiency')?.checked;
                        const bonus = parseInt(skillElement.querySelector('.bonus')?.value) || 0;
                        character.skills[skillName] = { proficient, bonus };
                    }
                });
                break;
    
            case 'background':
                const backgroundInput = getElement('background');
                if (backgroundInput) {
                    character.background = backgroundInput.value || '';
                }
                break;
    
            case 'alignment':
                const alignmentInput = getElement('alignment');
                if (alignmentInput) {
                    character.alignment = alignmentInput.value || '';
                }
                break;
    
            case 'equipment':
                const equipmentList = document.querySelectorAll('.equipment-item');
                character.equipment = Array.from(equipmentList).map(item => item.textContent);
                break;
    
            case 'notes':
                const notesInput = getElement('notes');
                if (notesInput) {
                    const additionalNotes = notesInput.value || '';
                    character.notes += additionalNotes + "\n";
                }
                break;
    
            default:
                console.warn(`Unhandled character field: ${field}`);
                break;
        }
        console.log(`Updated character ${field}:`, character[field]);
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
    
    // Function to update spellcasting UI
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
    
    function scrollToSpellLevel(level) {
        const spellLevelHeader = document.querySelector(`#spellList h4:nth-of-type(${parseInt(level)})`);
        if (spellLevelHeader) {
            spellLevelHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Function to update spell list
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
    
    // Function to toggle spell details
    function toggleSpellDetails(button) {
        const details = button.querySelector('.spell-details');
        details.classList.toggle('hidden');
    }
    
    // Function to cast a spell
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
            updateSpellSlotDisplay(); // Add this line to update the display
        } else {
            console.log(`No spell slots available for ${spell.name} (level ${spell.level})`);
            alert('No spell slots available for this spell!');
        }
    }

    function updateSpellSlotDisplay() {
        const spellSlotRow = document.querySelector('.spell-slot-row');
        if (!spellSlotRow) return;
    
        for (let i = 1; i <= 9; i++) {
            const slotSpan = document.getElementById(`spellSlot${i}`);
            if (slotSpan) {
                const maxSlots = character.spellcasting.spellSlots[i] || 0;
                const currentSlots = character.spellcasting.currentSpellSlots[i] || 0;
                slotSpan.textContent = `${currentSlots}/${maxSlots}`;
            }
        }
    }
    
    // Function to add a spell to the character's spell list
    function addSpellToCharacter() {
        const spellName = document.getElementById('spellSelect').value;
        const spell = spells.find(s => s.name === spellName);
        if (spell && !character.spellcasting.spells.some(s => s.name === spell.name)) {
            character.spellcasting.spells.push(spell);
            updateSpellList();
        }
    }

    modifyHPButton.addEventListener('click', () => {
        hpModal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', () => {
        hpModal.style.display = 'none';
    });
    
    healButton.addEventListener('click', () => {
        const amount = parseInt(hpChangeAmount.value) || 0;
        character.hp = Math.min(character.hp + amount, character.maxHp);
        updateHPDisplay();
        hpModal.style.display = 'none';
    });
    
    damageButton.addEventListener('click', () => {
        const amount = parseInt(hpChangeAmount.value) || 0;
        character.hp = Math.max(character.hp - amount, 0);
        updateHPDisplay();
        hpModal.style.display = 'none';
    });
    
    // Event listener for adding spells
    document.getElementById('addSpell').addEventListener('click', addSpellToCharacter);

    characterNotes.addEventListener('input', saveCharacterNotes);

    nameInput.addEventListener('input', () => updateCharInfo('name'));
raceSelect.addEventListener('change', () => updateCharInfo('race'));
classSelect.addEventListener('change', () => updateCharInfo('class'));
subclassSelect.addEventListener('change', () => updateCharInfo('subclass'));
levelInput.addEventListener('input', () => updateCharInfo('level'));

    saveCharacterJson.addEventListener('click', () => {
        // Implement JSON saving logic here
        const characterJson = JSON.stringify(character);
        const blob = new Blob([characterJson], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${character.name || 'character'}.json`;
        a.click();
        URL.revokeObjectURL(url);
    });

    returnToCreator.addEventListener('click', showCharacterCreator);

    levelUp.addEventListener('click', () => {
        // Implement level up logic here
        character.level++;
        checkAbilityScoreImprovement();
        checkNewFeats();
        updateCharacterSheet();
    });

    // Theme event listeners
    themeColorSelect.addEventListener('change', (e) => {
        const newColor = e.target.value;
        const isDark = themeModeToggle.checked;
        applyTheme(newColor, isDark);
        saveThemePreference(newColor, isDark);
    });
    
    themeModeToggle.addEventListener('change', (e) => {
        const isDark = e.target.checked;
        const currentColor = themeColorSelect.value;
        applyTheme(currentColor, isDark);
        saveThemePreference(currentColor, isDark);
    });

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
        updateCharInfo('subclass');
        console.log('Subclass updated:', character.subclass);  // Add this line for debugging
        if (levelInput.value < 3) {
            levelInput.value = 3;
            updateCharInfo('level');
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

 //   initializeRandomCharacterButton();
    
    loadCharacterJson.addEventListener('click', loadCharacterFromJson);

    document.addEventListener('DOMContentLoaded', loadThemePreference);

    // saveCharacterButton.addEventListener('click', showCharacterSheet);

    // saveCharacterButton.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     console.log('Save character button clicked');
        
    //     try {
    //         // Basic character information is already stored in the character object
    //         // throughout the character creation process, so we don't need to update it here
    
    //         // However, we might want to recalculate or update certain derived values
    //         character.proficiencyBonus = Math.ceil(1 + (character.level / 4));
    
    //         // Calculate HP if it hasn't been manually set
    //         if (!character.hp) {
    //             const conModifier = Math.floor((character.abilityScores.constitution - 10) / 2);
    //             const hitDice = getHitDiceByClass(character.class);
    //             character.hp = (hitDice + conModifier) + ((character.level - 1) * (Math.floor(hitDice / 2) + 1 + conModifier));
    //         }
    
    //         console.log('Character saved:', character);
    //         updateCharacterSheet();
    //         showCharacterSheet();
    //     } catch (error) {
    //         console.error('Error saving character:', error);
    //         console.error('Error details:', error.stack);
    //     }
    // });

    saveCharacterButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Save character button clicked');
        
        try {
            // Update all character information
            updateCharInfo('name');
            updateCharInfo('race');
            updateCharInfo('class');
            updateCharInfo('subclass');  // Add this line
            updateCharInfo('level');

            // Ensure subclass is set if a valid option is selected
            if (subclassSelect.selectedIndex > 0) {
                character.subclass = subclassSelect.options[subclassSelect.selectedIndex].value;
            } else {
                character.subclass = '';
            }
            
            // Update ability scores
            abilityScores.forEach(ability => {
                const abilityButton = document.querySelector(`[data-ability="${ability.toLowerCase()}"]`);
                if (abilityButton) {
                    character.abilityScores[ability.toLowerCase()] = parseInt(abilityButton.dataset.value) || 10;
                }
            });
            
            // Calculate derived values
            character.proficiencyBonus = Math.ceil(1 + (character.level / 4));
            
            // Calculate HP if it hasn't been manually set
            if (!character.hp) {
                const conModifier = Math.floor((character.abilityScores.constitution - 10) / 2);
                const hitDice = getHitDiceByClass(character.class);
                character.hp = (hitDice + conModifier) + ((character.level - 1) * (Math.floor(hitDice / 2) + 1 + conModifier));
            }
            
            console.log('Character saved:', character);
            updateCharacterSheet();
            showCharacterSheet();
        } catch (error) {
            console.error('Error saving character:', error);
            console.error('Error details:', error.stack);
        }
    });

    document.getElementById('addInventoryItem').addEventListener('click', addInventoryItem);
    document.getElementById('updateCurrency').addEventListener('click', updateCurrency);

     window.addEventListener('resize', adjustContentPadding);

    // initializeRandomCharacterButton();

    // Initialization
    // function init() {
    //     loadThemePreference();
    //     initializeCharacter();
    //     createAbilityScoreElements();
    //     showCard(-1); // Start by showing the start menu
    //     updateSkillModifiers();
    //     adjustContentPadding();
    //     initializeRandomCharacterButton(); // Add this line
    // }

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

    function init() {
        loadThemePreference();
        createAbilityScoreElements();
        showCard(-1); // Start by showing the start menu
        updateSkillModifiers();
        adjustContentPadding();
        initializeRandomCharacterButton();
        loadInventoryData(); // This line loads inventory data
        // Remove the loadSpells() call if it's here
    }

    // Promise.all([
    //     fetch('races.json').then(response => response.json()),
    //     fetch('classes.json').then(response => response.json())
    // ]).then(([racesData, classesData]) => {
    //     races = sortRacesAlphabetically(racesData);
    //     classes = classesData;
    //     populateRaceSelect();
    //     populateClassSelect();
    //     init(); // Call init() here
    // }).catch(error => console.error('Error loading data:', error));

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
        initializeSpellcasting();
        updateSpellcastingUI();
        init(); // Call init() here
    }).catch(error => console.error('Error loading data:', error));
});

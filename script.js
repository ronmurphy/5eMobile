// Constants and global variables
const abilityScores = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
const skills = [
    'Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception',
    'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine',
    'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion',
    'Sleight of Hand', 'Stealth', 'Survival'
];
const spellLevels = ['Cantrips', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'];
const APP_VERSION = "2";  // Note: It's a string to match the JSON format

let races = {};
let classes = [];
let weapons = [];
let armors = [];
let items = [];
let spells = [];
let rollHistory = [];

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

let currentCardIndex = 0;
let currentSectionIndex = 0;
const sections = ['attributesSection', 'skillsSection','combatSection',  'spellcastingSection','inventorySection', 'optionsSection' ];

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
    spellcasting: {
        class: "", // e.g., "Wizard", "Cleric", etc.
        ability: "", // e.g., "INT", "WIS", etc.
        spellSaveDC: 0,
        spellAttackBonus: 0,
        spells: [],
        spellSlots: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0
        },
        currentSpellSlots: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0
        }
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
    // D&D Beyond import code
    const showDndBeyondImportButton = document.getElementById('showDndBeyondImport');
    const importDndBeyondCharacterButton = document.getElementById('importDndBeyondCharacter');
    const loadExistingCharacterButton = document.getElementById('loadExistingCharacter');
    const cancelImportButton = document.getElementById('cancelImport');
    const jsonFileInput = document.getElementById('jsonFileInput');

    if (showDndBeyondImportButton) {
        showDndBeyondImportButton.addEventListener('click', showDndBeyondImportCard);
    }

    if (importDndBeyondCharacterButton) {
        importDndBeyondCharacterButton.addEventListener('click', importDndBeyondCharacter);
    }

    if (loadExistingCharacterButton) {
        loadExistingCharacterButton.addEventListener('click', loadCharacterFromJson);
    }

    if (cancelImportButton) {
        cancelImportButton.addEventListener('click', hideDndBeyondImportCard);
    }
}

function updateVersionDisplay() {
    const versionElement = document.getElementById('appVersion');
    if (versionElement) {
        versionElement.textContent = `(v${APP_VERSION})`;
    }
}

function startCharacterCreation() {
    console.log('Starting character creation');
    const startMenu = document.getElementById('startMenu');
    const characterCreator = document.getElementById('characterCreator');

    document.querySelectorAll('.card').forEach((card, index) => {
        if (index === 0) {
            card.classList.remove('hidden');  // Show Basic Information card
        } else {
            card.classList.add('hidden');    // Hide other cards
        }
    });
    currentCardIndex = 0;
    
    if (startMenu ) { //&& characterCreator
        startMenu.classList.add('hidden');
        characterCreator.classList.remove('hidden');
        showCard(-1); // Show the start menu
        // showCard(0); // Show the first card (Basic Information)
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


function generateRandomName() {
    const names = ["Aric", "Bree", "Cade", "Dara", "Elara", "Finn", "Gwen", "Holt", "Ivy", "Jace", "Kira", "Lark", "Mira", "Nox", "Orion", "Piper", "Quinn", "Rook", "Sage", "Thorne"];
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

function showAbilityScoreModal() {
    const modal = document.getElementById('abilityScoreModal');
    modal.style.display = 'block';

    document.getElementById('randomAbilityScores').addEventListener('click', () => {
        modal.style.display = 'none';
        // The random generation card is already visible, so we don't need to do anything else
    });

    document.getElementById('manualAbilityScores').addEventListener('click', () => {
        modal.style.display = 'none';
        showManualInputCard();
    });
}

function showManualInputCard() {
    const abilityCard = document.querySelector('#characterCreator .card:nth-child(2)');
    const manualInputCard = document.getElementById('manualInputCard');
    
    abilityCard.classList.add('hidden');
    manualInputCard.classList.remove('hidden');

    document.getElementById('finishAssigning').addEventListener('click', assignManualAbilityScores);
}

// function assignManualAbilityScores() {
//     const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    
//     abilities.forEach(ability => {
//         const score = parseInt(document.getElementById(`${ability}Input`).value);
//         if (score >= 3 && score <= 18) {
//             character.abilityScores[ability] = score;
//             const modifier = Math.floor((score - 10) / 2);
//             character[`${ability}Modifier`] = modifier;
            
//             // Update the UI
//             const abilityButton = document.querySelector(`[data-ability="${ability}"]`);
//             if (abilityButton) {
//                 abilityButton.textContent = `${ability.charAt(0).toUpperCase() + ability.slice(1)}: ${score} (${modifier >= 0 ? '+' : ''}${modifier})`;
//                 abilityButton.dataset.value = score;
//                 abilityButton.disabled = true;
//             }
//         } else {
//             alert(`Invalid score for ${ability}. Please enter a number between 8 and 18.`);
//             return;
//         }
//     });

//     // Hide manual input card and show the next card
//     document.getElementById('manualInputCard').classList.add('hidden');
//     showCard(currentCardIndex + 1);
// }

function assignManualAbilityScores() {
    const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
  
    abilities.forEach(ability => {
      const score = parseInt(document.getElementById(`${ability}Input`).value);
      if (score >= 3 && score <= 18) {
        const racialBonus = getRacialBonus(ability);
        const modifiedScore = score + racialBonus;
  
        character.abilityScores[ability] = modifiedScore;
        const modifier = Math.floor((modifiedScore - 10) / 2);
        character[`${ability}Modifier`] = modifier;
  
        // Update the UI
        const abilityButton = document.querySelector(`[data-ability="${ability}"]`);
        if (abilityButton) {
          abilityButton.textContent = `${ability.charAt(0).toUpperCase() + ability.slice(1)}: ${modifiedScore} (${modifier >= 0 ? '+' : ''}${modifier})`;
          abilityButton.dataset.value = modifiedScore;
          abilityButton.disabled = true;
        }
      } else {
        alert(`Invalid score for ${ability}. Please enter a number between 8 and 18.`);
        return;
      }
    });
  
    // Hide manual input card and show the next card
    document.getElementById('manualInputCard').classList.add('hidden');
    showCard(currentCardIndex + 1);
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
console,log('classFeaturesList:', classFeaturesList);
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

//UI-related functions
function showCard(index) {
    console.log(`Showing card at index: ${index}`);
    const characterCreator = document.getElementById('characterCreator');
    const cards = Array.from(characterCreator.querySelectorAll('.card'));
    
    if (cards.length === 0) {
        console.error('No cards found in character creator');
        return;
    }

    cards.forEach((card, i) => {
        card.classList.toggle('hidden', i !== index);
    });

    currentCardIndex = index;
    updateNavigationButtons();

    // If we're showing the Ability Scores card for the first time, show the modal
    if (index === 1 && !cards[index].dataset.modalShown) {
        showAbilityScoreModal();
        cards[index].dataset.modalShown = 'true';
    }

    // If we're showing the Skills card, populate it
    if (index === 2) {
        populateSkillsList();
    }
}



// function populateSkillsList() {
//     const skillList = document.getElementById('skillList');
//     if (!skillList) return;

//     skillList.innerHTML = '';
//     Object.entries(character.skills).forEach(([skillName, skillInfo]) => {
//         const skillDiv = document.createElement('div');
//         skillDiv.classList.add('skill-item');
//         const formattedSkillName = skillName.replace(/([A-Z])/g, ' $1').trim();
//         skillDiv.innerHTML = `
//             <label>
//                 <input type="checkbox" name="skill_${skillName}" ${skillInfo.proficient ? 'checked' : ''}>
//                 ${formattedSkillName}
//             </label>
//         `;
//         skillList.appendChild(skillDiv);
//     });
// }

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
          ${formattedSkillName} ${skillInfo.proficient ? '(Proficient)' : ''}
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

function initializeOptionsSection() {
    console.log('Initializing options section');
    const characterNotes = document.getElementById('characterNotes');
    if (characterNotes) {
        characterNotes.value = character.notes || '';
        characterNotes.addEventListener('input', () => {
            character.notes = characterNotes.value;
        });
    }

    const saveCharacterJsonButton = document.getElementById('saveCharacterJson');
    if (saveCharacterJsonButton) {
        saveCharacterJsonButton.addEventListener('click', saveCharacterToJson);
    }

    const loadCharacterJsonButton = document.getElementById('loadCharacterJson');
    if (loadCharacterJsonButton) {
        loadCharacterJsonButton.addEventListener('click', loadCharacterFromJson);
    }

    const returnToCreatorButton = document.getElementById('returnToCreator');
    if (returnToCreatorButton) {
        returnToCreatorButton.addEventListener('click', showCharacterCreator);
    }

    const levelUpButton = document.getElementById('levelUp');
    if (levelUpButton) {
        levelUpButton.addEventListener('click', () => {
            character.level++;
            updateCharacterSheet();
        });
    }
}

function showCharacterSheet() {
    console.log('Showing character sheet');
    const startMenu = document.getElementById('startMenu');
    const characterCreator = document.getElementById('characterCreator');
    const characterSheet = document.getElementById('characterSheet');
    
    if (startMenu && characterCreator && characterSheet) {
        console.log('Showing and Update character sheet');
        startMenu.classList.add('hidden');
        characterCreator.classList.add('hidden');
        characterSheet.classList.remove('hidden');
        calculateCharacterStats();
        updateCharacterSheet();
        updateFeaturesAndTraits(); // Add this line to ensure features and traits are updated
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
        
        // const acElement = document.getElementById('sheetAC');
        // if (acElement) acElement.textContent = character.ac || 10;
        // updateACDisplay();
        

        document.addEventListener('DOMContentLoaded', () => {
            const acElement = document.getElementById('sheetAC');
            if (acElement) {
              // Update AC on input events that affect AC
              // Replace "ac-trigger" with the actual element(s) that trigger AC recalculation
              document.querySelectorAll(".ac-trigger").forEach(trigger => {
                trigger.addEventListener("input", () => {
                  updateCharacterAC();
                });
              });
            
              // Set initial AC value (optional)
              acElement.textContent = character.ac || 10;
            }
          });

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
            updateSpellSlotsDisplay();
        }

        if (character.spellcasting) {
            updateSpellcastingUI();
            updateSpellSlotsDisplay();
        }
        
        // Notes
        const notesElement = document.getElementById('characterNotes');
        if (notesElement) notesElement.value = character.notes || '';
        
        // Currency
        updateCurrencyDisplay();





        

        // ... (other existing code)

        console.log('Calling updateCombatSection');
        updateCombatSection();

        initializeOptionsSection();
        updateHPDisplay();
        updateInitiativeDisplay();
        updateACDisplay();
        updateSpellSlotsDisplay();
    updateSpellListDisplay();
        
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
    console.log('Updating features and traits');
    console.log('Current character:', character);

    const featuresList = document.getElementById('featuresList');
    if (!featuresList) {
        console.warn('Features list element not found');
        return;
    }

    featuresList.innerHTML = '';

    // Add racial traits
    if (character.race && races[character.race]) {
        const raceData = races[character.race];
        const raceName = character.race;
        
        const raceHeader = document.createElement('h4');
        raceHeader.textContent = `${raceName} Traits`;
        featuresList.appendChild(raceHeader);

        // Add race description
        if (raceData.description) {
            const descLi = document.createElement('li');
            descLi.innerHTML = `<strong>Description:</strong> ${raceData.description}`;
            featuresList.appendChild(descLi);
        }

        // Add racial traits
        if (raceData.traits) {
            for (const [trait, value] of Object.entries(raceData.traits)) {
                if (trait !== 'abilityScoreIncrease') {
                    const li = document.createElement('li');
                    const traitName = trait.replace(/([A-Z])/g, ' $1').trim();
                    li.innerHTML = `<strong>${traitName}:</strong> ${value}`;
                    featuresList.appendChild(li);
                }
            }

            // Add ability score increase
            if (raceData.traits.abilityScoreIncrease) {
                const asiLi = document.createElement('li');
                asiLi.innerHTML = '<strong>Ability Score Increase:</strong> ';
                for (const [ability, increase] of Object.entries(raceData.traits.abilityScoreIncrease)) {
                    asiLi.innerHTML += `${ability.charAt(0).toUpperCase() + ability.slice(1)} +${increase}, `;
                }
                asiLi.innerHTML = asiLi.innerHTML.slice(0, -2); // Remove trailing comma and space
                featuresList.appendChild(asiLi);
            }
        }
    }

    // Add class features
    if (character.class) {
        console.log('Classes data:', classes);
        const classData = classes.find(c => c.name === character.class);
        console.log('Class data for', character.class, ':', classData);

        if (classData) {
            const classHeader = document.createElement('h4');
            classHeader.textContent = `${character.class} Features`;
            featuresList.appendChild(classHeader);

            // Add class description and basic info
            const classInfoLi = document.createElement('li');
            if (classData.hd && classData.hd.faces) {
                classInfoLi.innerHTML += `<strong>Hit Die:</strong> d${classData.hd.faces}<br>`;
            }
            if (classData.spellcastingAbility) {
                classInfoLi.innerHTML += `<strong>Spellcasting Ability:</strong> ${classData.spellcastingAbility.toUpperCase()}<br>`;
            }
            if (classData.source && classData.page) {
                classInfoLi.innerHTML += `<strong>Source:</strong> ${classData.source}, page ${classData.page}`;
            }
            featuresList.appendChild(classInfoLi);

            // Add class features
            if (classData.classFeatures) {
                classData.classFeatures.forEach(feature => {
                    const [featureName, , source, featureLevel] = feature.split('|');
                    if (parseInt(featureLevel) <= character.level) {
                        const li = document.createElement('li');
                        li.innerHTML = `<strong>${featureName} (Level ${featureLevel}):</strong> See ${source}, page ${classData.page}`;
                        featuresList.appendChild(li);
                    }
                });
            }

            // Add proficiencies
            if (classData.startingProficiencies) {
                const profLi = document.createElement('li');
                profLi.innerHTML = '<strong>Proficiencies:</strong><br>';
                if (classData.startingProficiencies.armor) {
                    profLi.innerHTML += `Armor: ${classData.startingProficiencies.armor.join(', ')}<br>`;
                }
                if (classData.startingProficiencies.weapons) {
                    profLi.innerHTML += `Weapons: ${classData.startingProficiencies.weapons.map(w => typeof w === 'object' ? w.proficiency : w).join(', ')}<br>`;
                }
                if (classData.startingProficiencies.tools) {
                    profLi.innerHTML += `Tools: ${classData.startingProficiencies.tools.join(', ')}<br>`;
                }
                if (classData.proficiency) {
                    profLi.innerHTML += `Saving Throws: ${classData.proficiency.map(p => p.toUpperCase()).join(', ')}`;
                }
                featuresList.appendChild(profLi);
            }
        } else {
            console.warn(`Class data for ${character.class} not found`);
        }
    }

    // Add subclass features if applicable
    if (character.subclass) {
        const classData = classes.find(c => c.name === character.class);
        if (classData) {
            const subclassData = classData.subclasses.find(sc => sc.name === character.subclass);
            if (subclassData) {
                const subclassHeader = document.createElement('h4');
                subclassHeader.textContent = `${character.subclass} Features`;
                featuresList.appendChild(subclassHeader);

                if (subclassData.subclassFeatures) {
                    subclassData.subclassFeatures.forEach(feature => {
                        const [featureName, , , featureLevel] = feature.split('|');
                        if (parseInt(featureLevel) <= character.level) {
                            const li = document.createElement('li');
                            li.innerHTML = `<strong>${featureName} (Level ${featureLevel}):</strong> See ${subclassData.source}`;
                            featuresList.appendChild(li);
                        }
                    });
                }
            }
        }
    }

    // Add any additional features or traits
    if (character.features && character.features.length > 0) {
        const additionalHeader = document.createElement('h4');
        additionalHeader.textContent = 'Additional Features';
        featuresList.appendChild(additionalHeader);

        character.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
    }

    if (featuresList.children.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No features or traits available.';
        featuresList.appendChild(li);
    }

    console.log('Features and traits update complete');
}

// Function to get the maximum spell level for a class at a given character level
function getMaxSpellLevel(characterClass, characterLevel) {
    const fullCasters = ['Wizard', 'Sorcerer', 'Bard', 'Cleric', 'Druid'];
    const halfCasters = ['Paladin', 'Ranger'];
    
    if (fullCasters.includes(characterClass)) {
        if (characterLevel >= 17) return 9;
        if (characterLevel >= 15) return 8;
        if (characterLevel >= 13) return 7;
        if (characterLevel >= 11) return 6;
        if (characterLevel >= 9) return 5;
        if (characterLevel >= 7) return 4;
        if (characterLevel >= 5) return 3;
        if (characterLevel >= 3) return 2;
        return 1;
    } else if (halfCasters.includes(characterClass)) {
        return Math.min(5, Math.ceil(characterLevel / 2));
    } else if (characterClass === 'Warlock') {
        if (characterLevel >= 17) return 9;
        if (characterLevel >= 11) return 5;
        if (characterLevel >= 7) return 4;
        if (characterLevel >= 5) return 3;
        if (characterLevel >= 3) return 2;
        return 1;
    }
    
    return 0; // For non-spellcasting classes
}

function updateSpellListDisplay() {
    const spellListDiv = document.getElementById('spellList');
    if (spellListDiv) {
        spellListDiv.innerHTML = '';
        const maxSpellLevel = getMaxSpellLevel(character.class, character.level);
        
        for (let i = 0; i <= maxSpellLevel; i++) {
            const levelHeader = document.createElement('h4');
            levelHeader.id = `spellLevel${i}`;
            levelHeader.textContent = i === 0 ? 'Cantrips' : `Level ${i}`;
            spellListDiv.appendChild(levelHeader);
            
            // Filter and display spells for this level
            const levelSpells = character.spellcasting.spells.filter(spell => spell.level === i);
            levelSpells.forEach(spell => {
                const spellElement = createSpellElement(spell);
                spellListDiv.appendChild(spellElement);
            });
        }
    }
}

// Helper function to create a spell element
function createSpellElement(spell) {
    const spellDiv = document.createElement('div');
    spellDiv.className = 'spell-item';
    spellDiv.innerHTML = `
        <span class="spell-name">${spell.name}</span>
        <button class="cast-spell-button" onclick="castSpell('${spell.name}')">Cast</button>
    `;
    return spellDiv;
}

function updateSpellSelect() {
    const spellSelect = document.getElementById('spellSelect');
    if (spellSelect) {
        spellSelect.innerHTML = '<option value="">Select a spell</option>';
        const maxSpellLevel = getMaxSpellLevel(character.class, character.level);
        spells.filter(spell => spell.classes.includes(character.class) && spell.level <= maxSpellLevel)
            .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name))
            .forEach(spell => {
                const option = document.createElement('option');
                option.value = spell.name;
                option.textContent = `${spell.name} (Level ${spell.level})`;
                spellSelect.appendChild(option);
            });
    }
}

// Function to update spell slots (to be used when leveling up or initializing)
function updateSpellSlots() {
    if (character.spellcasting.class) {
      const maxSlots = calculateSpellSlots(character.spellcasting.class, character.level);
      character.spellcasting.spellSlots = maxSlots;
      // Optionally, you might want to reset current spell slots to max
      character.spellcasting.currentSpellSlots = {...maxSlots};
    }
  }

  function useSpellSlot(level) {
    if (character.spellcasting.currentSpellSlots[level] > 0) {
      character.spellcasting.currentSpellSlots[level]--;
      return true;
    }
    return false;
  }

  function restoreSpellSlots() {
    character.spellcasting.currentSpellSlots = {...character.spellcasting.spellSlots};
  }


// function updateSpellSlotsDisplay() {
//     const spellSlotsDiv = document.getElementById('spellSlots');
//     if (!spellSlotsDiv) {
//         console.warn('Spell slots div not found');
//         return;
//     }

//     spellSlotsDiv.innerHTML = '<h4>Spell Slots:</h4>';
//     const row = document.createElement('div');
//     row.className = 'spell-slot-row';
    
//     const maxSpellLevel = getMaxSpellLevel(character.class, character.level);
    
//     for (let i = 1; i <= maxSpellLevel; i++) {
//         if (character.spellcasting.spellSlots[i] > 0) {
//             const slotButton = document.createElement('button');
//             slotButton.className = 'spell-slot-button';
//             slotButton.textContent = `${i}: ${character.spellcasting.currentSpellSlots[i]}/${character.spellcasting.spellSlots[i]}`;
//             slotButton.onclick = () => scrollToSpellLevel(i);
//             row.appendChild(slotButton);
//         }
//     }
//     spellSlotsDiv.appendChild(row);
// }


function updateSpellSlotsDisplay() {
    const spellSlotsDiv = document.getElementById('spellSlots');
    if (spellSlotsDiv) {
        spellSlotsDiv.innerHTML = '<h4>Spell Slots:</h4>';
        const row = document.createElement('div');
        row.className = 'spell-slot-row';
        
        const maxSpellLevel = getMaxSpellLevel(character.class, character.level);
        
        for (let i = 1; i <= maxSpellLevel; i++) {
            if (character.spellcasting.spellSlots[i] > 0) {
                const slotButton = document.createElement('button');
                slotButton.className = 'spell-slot-button';
                slotButton.textContent = `${i}: ${character.spellcasting.currentSpellSlots[i]}/${character.spellcasting.spellSlots[i]}`;
                slotButton.onclick = () => scrollToSpellLevel(i);
                row.appendChild(slotButton);
            }
        }
        spellSlotsDiv.appendChild(row);
    }
}

function scrollToSpellLevel(level) {
    const spellLevelHeader = document.getElementById(`spellLevel${level}`);
    if (spellLevelHeader) {
        spellLevelHeader.scrollIntoView({ behavior: 'smooth' });
    }
}


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
    
    function updateSimplifiedSpellSlots() {
        const spellSlotsDiv = document.getElementById('combatSpellSlots');
        if (!spellSlotsDiv) {
            console.error('Combat spell slots element not found');
            return;
        }
        spellSlotsDiv.innerHTML = '<h4>Spell Slots:</h4>';
        const row = document.createElement('div');
        row.className = 'spell-slot-row';
        
        const maxSpellLevel = getMaxSpellLevel(character.class, character.level);
        
        for (let i = 1; i <= maxSpellLevel; i++) {
            if (character.spellcasting.spellSlots[i] > 0) {
                const slotSpan = document.createElement('span');
                slotSpan.className = 'spell-slot';
                slotSpan.textContent = `${i}: ${character.spellcasting.currentSpellSlots[i]}/${character.spellcasting.spellSlots[i]}`;
                row.appendChild(slotSpan);
            }
        }
        spellSlotsDiv.appendChild(row);
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
                const spellItem = document.createElement('li');
                spellItem.className = 'spell-item';
                spellItem.innerHTML = `
                    <details>
                        <summary>${spell.name}</summary>
                        <p>${spell.description || 'No description available.'}</p>
                    </details>
                    <button class="cast-spell" onclick="castSpell('${spell.name}')">Cast</button>
                `;
                levelDiv.appendChild(spellItem);
            });
            spellListDiv.appendChild(levelDiv);
        });
    }
    
    function toggleSpellDetails(button) {
        const details = button.querySelector('.spell-details');
        details.classList.toggle('hidden');
    }
    
    function castSpell(spellOrName) {
        let spell;
        if (typeof spellOrName === 'string') {
            spell = character.spellcasting.spells.find(s => s.name === spellOrName);
        } else {
            spell = spellOrName;
        }
    
        if (!spell) {
            console.log(`Spell ${spellOrName} not found`);
            return;
        }
    
        if (spell.level === 0) {
            console.log(`Cast ${spell.name} (Cantrip)`);
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
            updateSpellSlotsDisplay();
            updateSimplifiedSpellSlots(); // Update the combat section spell slots
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

    function updateCombatSection() {
        console.log('Updating combat section');
        updateWeaponsList();
        updateCombatSpellsList();
        updateSimplifiedSpellSlots();
    }

    function updateWeaponsList() {
        console.log('Updating weapons list');
        const weaponsList = document.getElementById('weaponsList');
        if (!weaponsList) {
            console.error('Weapons list element not found');
            return;
        }
        weaponsList.innerHTML = '';
    
        character.inventory.forEach(item => {
            if (item.type === 'weapon') {
                const li = document.createElement('li');
                li.className = 'weapon-item';
                li.innerHTML = `
                    <div class="weapon-info">
                        <span class="weapon-name">${item.name}</span>
                        <span class="weapon-damage">(${item.damage})</span>
                    </div>
                    <div class="weapon-actions">
                        <button class="roll-to-hit" onclick="rollToHit('${item.name}')">Roll to Hit</button>
                        <button class="roll-damage" onclick="rollDamage('${item.name}')">Roll Damage</button>
                    </div>
                `;
                weaponsList.appendChild(li);
            }
        });
    }

    function updateCombatSpellsList() {
        console.log('Updating combat spells list');
        const combatSpellsList = document.getElementById('combatSpellsList');
        if (!combatSpellsList) {
            console.error('Combat spells list element not found');
            return;
        }
        combatSpellsList.innerHTML = '';
    
        if (character.spellcasting && Array.isArray(character.spellcasting.spells)) {
            character.spellcasting.spells.forEach(spell => {
                const li = document.createElement('li');
                li.className = 'spell-item';
                const levelAbbr = spell.level === 0 ? 'C' : `L${spell.level}`;
                li.innerHTML = `
                    <details>
                        <summary><span class="spell-level">${levelAbbr}:</span> ${spell.name}</summary>
                        <p>${spell.description || 'No description available.'}</p>
                    </details>
                    <button class="cast-spell" onclick="castSpell('${spell.name}')">Cast</button>
                `;
                combatSpellsList.appendChild(li);
            });
        } else {
            console.warn('Character spellcasting is not properly initialized');
        }
    }

    function showNotification(message, isRoll = false) {
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
    
        if (isRoll) {
            addToRollHistory(message);
        }
    }
    
    function addToRollHistory(roll) {
        rollHistory.unshift(roll);
        if (rollHistory.length > 5) {
            rollHistory.pop();
        }
        updateRollHistoryDisplay();
    }
    
    function updateRollHistoryDisplay() {
        const rollHistoryElement = document.getElementById('rollHistory');
        if (rollHistoryElement) {
            rollHistoryElement.innerHTML = '<h4>Recent Rolls</h4>';
            rollHistory.forEach(roll => {
                const rollItem = document.createElement('div');
                rollItem.textContent = roll;
                rollHistoryElement.appendChild(rollItem);
            });
        }
    }

function rollToHit(weaponName) {
    const weapon = character.inventory.find(item => item.name === weaponName);
    if (!weapon) {
        console.error(`Weapon ${weaponName} not found in inventory`);
        return;
    }

    const d20Roll = rollDie(20);
    let abilityModifier;
    if (weapon.properties.includes('Finesse')) {
        const strMod = Math.floor((character.abilityScores.strength - 10) / 2);
        const dexMod = Math.floor((character.abilityScores.dexterity - 10) / 2);
        abilityModifier = Math.max(strMod, dexMod);
    } else {
        abilityModifier = Math.floor((character.abilityScores.strength - 10) / 2);
    }

    const proficiencyBonus = character.proficiencyBonus;
    const totalRoll = d20Roll + abilityModifier + proficiencyBonus;

    const message = `Roll to hit with ${weaponName}: ${totalRoll} (d20: ${d20Roll}, ability: ${abilityModifier}, proficiency: ${proficiencyBonus})`;
    showNotification(message);
    addToRollHistory(message);
}

function rollDamage(weaponName) {
    const weapon = character.inventory.find(item => item.name === weaponName);
    if (!weapon) {
        console.error(`Weapon ${weaponName} not found in inventory`);
        return;
    }

    const damageRoll = rollDice(weapon.damage);
    let abilityModifier;
    if (weapon.properties.includes('Finesse')) {
        const strMod = Math.floor((character.abilityScores.strength - 10) / 2);
        const dexMod = Math.floor((character.abilityScores.dexterity - 10) / 2);
        abilityModifier = Math.max(strMod, dexMod);
    } else {
        abilityModifier = Math.floor((character.abilityScores.strength - 10) / 2);
    }

    const totalDamage = damageRoll + abilityModifier;

    const message = `Damage roll for ${weaponName}: ${totalDamage} (${weapon.damage}: ${damageRoll}, ability: ${abilityModifier})`;
    showNotification(message);
    addToRollHistory(message);
}
    
    function rollDice(diceNotation) {
        const [numDice, numSides] = diceNotation.split('d').map(Number);
        let total = 0;
        for (let i = 0; i < numDice; i++) {
            total += rollDie(numSides);
        }
        return total;
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

function levelUp() {
    character.level++;
    calculateCharacterStats();
    updateSpellSlots();
    updateCharacterSheet();
    updateSpellSlotsDisplay();
    updateSpellSelect(); // Update available spells
    updateSpellListDisplay();
}

function navigateSection(direction) {
    currentSectionIndex += direction;
    if (currentSectionIndex < 0) currentSectionIndex = sections.length - 1;
    if (currentSectionIndex >= sections.length) currentSectionIndex = 0;

    sections.forEach((section, index) => {
        document.getElementById(section).classList.toggle('hidden', index !== currentSectionIndex);
    });

    updateSectionName();

    // If we're navigating to the combat section, update it
    if (sections[currentSectionIndex] === 'combatSection') {
        console.log('Navigated to combat section');
        updateCombatSection();
    }
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

function calculateCharacterStats() {
    // Calculate HP
    const conModifier = Math.floor((character.abilityScores.constitution - 10) / 2);
    const hitDice = getHitDiceByClass(character.class);
    character.maxHp = hitDice + conModifier + ((character.level - 1) * (Math.floor(hitDice / 2) + 1 + conModifier));
    if (!character.hp) {
        character.hp = character.maxHp;
    }

    // Calculate AC
    const dexModifier = Math.floor((character.abilityScores.dexterity - 10) / 2);
    character.ac = 10 + dexModifier;

    // Calculate Initiative
    character.initiative = dexModifier;

    // Set proficiency bonus based on level
    character.proficiencyBonus = Math.ceil(1 + (character.level / 4));

    // Set speed (default to 30, but should be adjusted based on race)
    const raceTraits = races[character.race]?.traits || {};
    character.speed = raceTraits.speed || 30;

    // Set hit dice
    character.hitDie.faces = getHitDiceByClass(character.class);
    character.currentHitDice = character.level;
    character.maxHitDice = character.level;
    character.notes = '';
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
    const alignments = ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral'];
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
    calculateCharacterStats();

    console.log('Random character generation complete');
    console.log('Generated character:', character);

    updateCharacterSheet();
    showCharacterSheet();
}

// function saveCharacterToJson() {
//     const characterData = { ...character };
//     characterData.spellcasting.spells = character.spellcasting.spells.map(spell => spell.name);
//     const characterJson = JSON.stringify(characterData, null, 2);
//     const blob = new Blob([characterJson], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `${character.name || 'character'}.json`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
// }

function saveCharacterToJson() {
    const characterData = { ...character };
    characterData.spellcasting.spells = character.spellcasting.spells.map(spell => spell.name);
    
    const versionedData = {
        version: APP_VERSION,
        ...characterData
    };

    const characterJson = JSON.stringify(versionedData, null, 2);
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

// function loadCharacterFromJson() {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = '.json';
//     input.onchange = (event) => {
//         const file = event.target.files[0];
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             try {
//                 const loadedCharacter = JSON.parse(e.target.result);
//                 Object.assign(character, loadedCharacter);
                
//                 // Process spellcasting data
//                 if (character.spellcasting && character.spellcasting.spells) {
//                     character.spellcasting.spells = character.spellcasting.spells.map(spellName => 
//                         spells.find(spell => spell.name === spellName)
//                     ).filter(spell => spell !== undefined);
//                 }
                
//                 updateCharacterSheet();
//                 showCharacterSheet();
//                 hideDndBeyondImportCard(); // Add this line to hide the import card
//                 console.log('Character loaded successfully');
//             } catch (error) {
//                 console.error('Error loading character:', error);
//                 alert('Error loading character. Please check the file format.');
//             }
//         };
//         reader.readAsText(file);
//     };
//     input.click();
// }

function loadCharacterFromJson() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const loadedData = JSON.parse(e.target.result);
                
                if (loadedData.version) {
                    console.log(`Loading character file version: ${loadedData.version}`);
                    // Remove the version property before assigning to character
                    const { version, ...characterData } = loadedData;
                    Object.assign(character, characterData);
                } else {
                    console.log('Loading legacy character file');
                    Object.assign(character, loadedData);
                }
                
                // Process spellcasting data
                if (character.spellcasting && character.spellcasting.spells) {
                    character.spellcasting.spells = character.spellcasting.spells.map(spellName => 
                        spells.find(spell => spell.name === spellName)
                    ).filter(spell => spell !== undefined);
                }
                
                updateCharacterSheet();
                showCharacterSheet();
                hideDndBeyondImportCard();
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
            levelUp();
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

    document.addEventListener('DOMContentLoaded', () => {
        // ... your existing DOMContentLoaded code ...
        updateVersionDisplay();
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
    updateVersionDisplay();

    // Only update skills if the character sheet is visible
    if (!document.getElementById('characterSheet').classList.contains('hidden')) {
        updateSkillModifiers();
        updateFeaturesAndTraits();
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

    if (weaponSelect && weaponSelect.value !== "") {
        const selectedWeapon = weapons.find(weapon => weapon.name === weaponSelect.value);
        if (selectedWeapon) {
            addItemToInventory(selectedWeapon);
        }
    }

    if (armorSelect && armorSelect.value !== "") {
        const selectedArmor = armors.find(armor => armor.name === armorSelect.value);
        if (selectedArmor) {
            addItemToInventory(selectedArmor);
        }
    }

    if (itemSelect && itemSelect.value !== "") {
        const selectedItem = items.find(item => item.name === itemSelect.value);
        if (selectedItem) {
            addItemToInventory(selectedItem);
        }
    }

    // Reset dropdowns
    if (weaponSelect) weaponSelect.value = "";
    if (armorSelect) armorSelect.value = "";
    if (itemSelect) itemSelect.value = "";
}


function updateCharacterAC() {
    const dexMod = Math.floor((character.abilityScores.dexterity - 10) / 2);
    const conMod = Math.floor((character.abilityScores.constitution - 10) / 2);
    const wisMod = Math.floor((character.abilityScores.wisdom - 10) / 2);
    let baseAC = 10 + dexMod;

    // Find the highest AC armor in the inventory
    const bestArmor = character.inventory
        .filter(item => item.type === 'armor')
        .reduce((best, current) => (current.ac > best.ac ? current : best), { ac: 0 });

    let unarmoredAC = baseAC;

    // Calculate unarmored AC for Barbarian and Monk
    if (character.class === 'Barbarian') {
        unarmoredAC = 10 + dexMod + conMod;
    } else if (character.class === 'Monk') {
        unarmoredAC = 10 + dexMod + wisMod;
    }

    // Determine if armor or unarmored defense is better
    if (bestArmor.ac > 0) {
        if (bestArmor.type === 'Light Armor') {
            baseAC = Math.max(bestArmor.ac + dexMod, unarmoredAC);
        } else if (bestArmor.type === 'Medium Armor') {
            baseAC = Math.max(bestArmor.ac + Math.min(dexMod, 2), unarmoredAC);
        } else if (bestArmor.type === 'Heavy Armor') {
            baseAC = Math.max(bestArmor.ac, unarmoredAC);
        }
    } else {
        baseAC = unarmoredAC;
    }

    // Check for shield
    const hasShield = character.inventory.some(item => item.name === 'Shield');
    if (hasShield) {
        baseAC += 2;
    }

    character.ac = baseAC;
    updateACDisplay();
    updateCharacterSheet();
}

function updateACDisplay() {
    const sheetAC = document.getElementById('sheetAC');
    if (sheetAC) {
        sheetAC.textContent = character.ac;
    }
}


function getItemFromSelect(select) {
    const itemList = select.id === 'weaponSelect' ? weapons :
                     select.id === 'armorSelect' ? armors : items;
    return itemList.find(item => item.name === select.value);
}

function addItemToInventory(item) {
    if (!character.inventory) character.inventory = [];
    character.inventory.push(item);
    updateInventoryDisplay();
    console.log('Added item to inventory:', item);
    console.log(item.type);
    if (item.type === 'armor') {
        updateCharacterAC();
    }
}

function updateInventoryDisplay() {
    const inventoryList = document.getElementById('inventoryList');
    if (inventoryList) {
        inventoryList.innerHTML = '';
        character.inventory.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name}</span>
                ${item.damage ? `<span>(${item.damage} ${item.damageType})</span>` : ''}
                ${item.ac ? `<span>(AC ${item.ac})</span>` : ''}
                <button class="remove-item" onclick="removeItemFromInventory(${index})">Remove</button>
            `;
            inventoryList.appendChild(li);
        });
    }
}

function removeItemFromInventory(index) {
    if (index >= 0 && index < character.inventory.length) {
        const removedItem = character.inventory.splice(index, 1)[0];
        updateInventoryDisplay();
        if (removedItem.type === 'armor') {
            updateCharacterAC();
        }
    }
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
// d&d beyond code
function showDndBeyondImportCard() {
    const startMenu = document.getElementById('startMenu');
    const importCard = document.getElementById('dndBeyondImportCard');
    
    if (startMenu && importCard) {
        startMenu.classList.add('hidden');
        importCard.classList.remove('hidden');
    }
}

function hideDndBeyondImportCard() {
    const startMenu = document.getElementById('startMenu');
    const importCard = document.getElementById('dndBeyondImportCard');
    const characterSheet = document.getElementById('characterSheet');
    
    if (importCard) {
        importCard.classList.add('hidden');
    }
    
    if (startMenu) {
        startMenu.classList.add('hidden');
    }
    
    if (characterSheet) {
        characterSheet.classList.remove('hidden');
    }
}

function importJsonCharacter() {
    const fileInput = document.getElementById('jsonFileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const characterData = JSON.parse(e.target.result);
                processImportedCharacterData(characterData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert('Error parsing the JSON file. Please ensure it\'s a valid D&D Beyond export.');
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a JSON file to import.');
    }
}

function importDndBeyondCharacter() {
    const fileInput = document.getElementById('jsonFileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const characterData = JSON.parse(e.target.result);
                processImportedCharacterData(characterData);
                hideDndBeyondImportCard(); // Add this line to hide the import card
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert('Error parsing the JSON file. Please ensure it\'s a valid D&D Beyond export.');
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a JSON file to import.');
    }
}

function processImportedCharacterData(data) {
    //brad
    console.log('Processing imported D&D Beyond character data:', data);
    try {
        let importedCharacter = {
            name: data.name || 'Unknown',
            race: data.race?.fullName || data.race?.name || 'Unknown Race',
            class: data.classes && data.classes[0] ? data.classes[0].definition.name : 'Unknown Class',
            subclass: data.classes && data.classes[0] && data.classes[0].subclassDefinition ? data.classes[0].subclassDefinition.name : '',
            level: data.classes && data.classes[0] ? data.classes[0].level : 1,
            alignment: data.alignmentId || 'Unknown Alignment',
            abilityScores: {},
            skills: {},
            hp: data.hitPointInfo?.current || 0,
            maxHp: data.hitPointInfo?.max || 0,
            ac: data.armorClass || 10,
            initiative: data.initiativeBonus || 0,
            proficiencyBonus: data.proficiencyBonus || 2,
            speed: data.race?.weightSpeeds?.normal?.walk || 30,
            savingThrows: {},
            inventory: data.inventory || [],
            spellcasting: {
                class: data.classes && data.classes[0] ? data.classes[0].definition.name : '',
                ability: null,
                spells: data.spells || [],
                spellSlots: {},
                currentSpellSlots: {}
            },
            currency: data.currencies || {},
            hitDie: {
                number: data.classes && data.classes[0] ? data.classes[0].level : 1,
                faces: data.classes && data.classes[0] ? data.classes[0].definition.hitDice : 6
            },
            traits: {
                personalityTraits: data.traits?.personalityTraits || '',
                ideals: data.traits?.ideals || '',
                bonds: data.traits?.bonds || '',
                flaws: data.traits?.flaws || ''
            },
            notes: data.notes || '',
            background: data.background?.definition?.name || '',
            experiencePoints: data.currentXp || 0
        };

        // Process ability scores
        if (data.stats && Array.isArray(data.stats)) {
            const abilityMap = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
            data.stats.forEach(stat => {
                if (stat.id >= 1 && stat.id <= 6) {
                    importedCharacter.abilityScores[abilityMap[stat.id - 1]] = stat.value || 10;
                }
            });
        }

        // Process skills
        if (data.skills && Array.isArray(data.skills)) {
            data.skills.forEach(skill => {
                const skillName = skill.name.toLowerCase().replace(/\s+/g, '');
                importedCharacter.skills[skillName] = {
                    proficient: skill.proficient || false,
                    expertise: skill.expertise || false,
                    bonus: skill.value || 0
                };
            });
        }

        // Process saving throws
        if (data.savingThrows && Array.isArray(data.savingThrows)) {
            const abilityMap = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
            data.savingThrows.forEach(save => {
                if (save.statId >= 1 && save.statId <= 6) {
                    const abilityName = abilityMap[save.statId - 1];
                    importedCharacter.savingThrows[abilityName] = {
                        proficient: save.proficient || false,
                        value: save.value || 0
                    };
                }
            });
        }

        // Process spellcasting
        if (data.classes && data.classes[0] && data.classes[0].definition.spellCastingAbilityId) {
            const abilityMap = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
            importedCharacter.spellcasting.ability = abilityMap[data.classes[0].definition.spellCastingAbilityId - 1] || null;
        }

        if (data.spellSlots) {
            importedCharacter.spellcasting.spellSlots = {...data.spellSlots};
            importedCharacter.spellcasting.currentSpellSlots = {...data.spellSlots};
        }

        // Calculate derived stats
        calculateDnDBeyondDerivedStats(importedCharacter);

        // Update the character object
        Object.assign(character, importedCharacter);

        // Update the UI
        updateDnDBeyondCharacterSheet(character);
        updateDnDBeyondTraits(character);
        updateDnDBeyondSimplifiedSpellSlots(character);

        console.log('D&D Beyond character import complete:', character);
    } catch (error) {
        console.error('Error processing D&D Beyond character data:', error);
        alert('There was an error processing the D&D Beyond character data. Some information may be incomplete.');
    }
}


function calculateDnDBeyondDerivedStats(char) {
    // Calculate ability modifiers
    for (let ability in char.abilityScores) {
        char[`${ability}Modifier`] = Math.floor((char.abilityScores[ability] - 10) / 2);
    }

    // Update saving throws
    for (let save in char.savingThrows) {
        char.savingThrows[save].value = char[`${save}Modifier`] || 0;
        if (char.savingThrows[save].proficient) {
            char.savingThrows[save].value += char.proficiencyBonus;
        }
    }

    // Update skills
    for (let skillName in char.skills) {
        let associatedAbility = getAssociatedAbility(skillName);
        char.skills[skillName].bonus = char[`${associatedAbility}Modifier`] || 0;
        if (char.skills[skillName].proficient) {
            char.skills[skillName].bonus += char.proficiencyBonus;
        }
        if (char.skills[skillName].expertise) {
            char.skills[skillName].bonus += char.proficiencyBonus;
        }
    }

    // Calculate passive perception
    char.passivePerception = 10 + (char.skills.perception?.bonus || char.wisdomModifier || 0);

    // Calculate spell save DC and spell attack bonus
    if (char.spellcasting && char.spellcasting.ability) {
        let spellAbilityModifier = char[`${char.spellcasting.ability}Modifier`] || 0;
        char.spellcasting.spellSaveDC = 8 + char.proficiencyBonus + spellAbilityModifier;
        char.spellcasting.spellAttackBonus = char.proficiencyBonus + spellAbilityModifier;
    }

    // Calculate initiative if not provided
    if (char.initiative === undefined) {
        char.initiative = char.dexterityModifier || 0;
    }

    // Calculate AC if not provided (assuming unarmored)
    if (char.ac === undefined) {
        char.ac = 10 + (char.dexterityModifier || 0);
    }

    console.log('Calculated D&D Beyond derived stats:', char);
}


function addSaveDnDBeyondCharacterButton(character) {
const optionsSection = document.getElementById('optionsSection');
if (optionsSection) {
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save D&D Beyond Character';
    saveButton.onclick = () => saveDnDBeyondCharacterToJson(character);
    optionsSection.appendChild(saveButton);
}
}


function updateDnDBeyondSimplifiedSpellSlots(character) {
    const spellSlotsDiv = document.getElementById('combatSpellSlots');
    if (!spellSlotsDiv) {
        console.error('Combat spell slots element not found');
        return;
    }
    spellSlotsDiv.innerHTML = '<h4>Spell Slots:</h4>';
    const row = document.createElement('div');
    row.className = 'spell-slot-row';
    
    if (character.spellcasting && character.spellcasting.spellSlots) {
        const maxSpellLevel = Math.max(...Object.keys(character.spellcasting.spellSlots).map(Number));
        
        for (let i = 1; i <= maxSpellLevel; i++) {
            if (character.spellcasting.spellSlots[i] > 0) {
                const slotSpan = document.createElement('span');
                slotSpan.className = 'spell-slot';
                slotSpan.textContent = `${i}: ${character.spellcasting.currentSpellSlots[i] || 0}/${character.spellcasting.spellSlots[i]}`;
                row.appendChild(slotSpan);
            }
        }
    } else {
        const noSlotsSpan = document.createElement('span');
        noSlotsSpan.textContent = 'No spell slots available';
        row.appendChild(noSlotsSpan);
    }
    
    spellSlotsDiv.appendChild(row);
}

// function saveDnDBeyondCharacterToJson(character) {
//     const characterData = {
//         name: character.name,
//         race: character.race,
//         class: character.class,
//         subclass: character.subclass,
//         level: character.level,
//         background: character.background,
//         alignment: character.alignment,
//         experiencePoints: character.experiencePoints,
//         abilityScores: { ...character.abilityScores },
//         skills: { ...character.skills },
//         proficiencyBonus: character.proficiencyBonus,
//         hp: character.hp,
//         maxHp: character.maxHp,
//         ac: character.ac,
//         initiative: character.initiative,
//         speed: character.speed,
//         hitDie: character.hitDie,
//         savingThrows: { ...character.savingThrows },
//         traits: {
//             personalityTraits: character.personalityTraits,
//             ideals: character.ideals,
//             bonds: character.bonds,
//             flaws: character.flaws
//         },
//         features: [], // You may need to populate this from character.features if available
//         inventory: character.inventory.map(item => ({
//             name: item.name,
//             quantity: item.quantity,
//             weight: item.weight,
//             description: item.description
//         })),
//         spellcasting: {
//             class: character.spellcasting.class,
//             ability: character.spellcasting.ability,
//             spellSaveDC: character.spellcasting.spellSaveDC,
//             spellAttackBonus: character.spellcasting.spellAttackBonus,
//             spells: character.spellcasting.spells.map(spell => typeof spell === 'string' ? spell : spell.name),
//             spellSlots: { ...character.spellcasting.spellSlots },
//             currentSpellSlots: { ...character.spellcasting.currentSpellSlots }
//         },
//         currency: { ...character.currency },
//         notes: character.notes
//     };

//     const characterJson = JSON.stringify(characterData, null, 2);
//     const blob = new Blob([characterJson], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `${character.name || 'character'}.json`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
// }

function saveDnDBeyondCharacterToJson(character) {
    const characterData = {
        name: character.name,
        race: character.race,
        class: character.class,
        subclass: character.subclass,
        level: character.level,
        background: character.background,
        alignment: character.alignment,
        experiencePoints: character.experiencePoints,
        abilityScores: { ...character.abilityScores },
        skills: { ...character.skills },
        proficiencyBonus: character.proficiencyBonus,
        hp: character.hp,
        maxHp: character.maxHp,
        ac: character.ac,
        initiative: character.initiative,
        speed: character.speed,
        hitDie: character.hitDie,
        maxHitDice: character.maxHitDice,
        currentHitDice: character.currentHitDice,
        savingThrows: { ...character.savingThrows },
        traits: {
            personalityTraits: character.personalityTraits,
            ideals: character.ideals,
            bonds: character.bonds,
            flaws: character.flaws
        },
        features: [], // You may need to populate this from character.features if available
        inventory: character.inventory.map(item => ({
            name: item.name,
            quantity: item.quantity,
            weight: item.weight,
            description: item.description
        })),
        spellcasting: {
            class: character.spellcasting.class,
            ability: character.spellcasting.ability,
            spellSaveDC: character.spellcasting.spellSaveDC,
            spellAttackBonus: character.spellcasting.spellAttackBonus,
            spells: character.spellcasting.spells.map(spell => typeof spell === 'string' ? spell : spell.name),
            spellSlots: { ...character.spellcasting.spellSlots },
            currentSpellSlots: { ...character.spellcasting.currentSpellSlots }
        },
        currency: { ...character.currency },
        notes: character.notes,
        languages: character.languages || [],
        feats: character.feats || [],
        abilityScoreImprovementsLeft: character.abilityScoreImprovementsLeft || 0
    };

    const versionedData = {
        version: APP_VERSION,
        ...characterData
    };

    const characterJson = JSON.stringify(versionedData, null, 2);
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

function updateDnDBeyondCharacterSheet(char) {
    console.log('Updating D&D Beyond character sheet:', char);

    try {
        // Helper function to safely update element text content
        const updateElementText = (id, text) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = text;
            } else {
                console.warn(`Element with id '${id}' not found`);
            }
        };

        // Update character name and basic info
        updateElementText('sheetCharacterName', char.name);
        updateElementText('sheetRaceClass', `${char.race} - Level ${char.level} ${char.class} (${char.subclass}) - ${char.alignment}`);

        // Update HP, AC, and Initiative
        updateElementText('sheetHP', `${char.hp}/${char.maxHp}`);
        updateElementText('sheetAC', char.ac);
        
        const initiativeButton = document.getElementById('rollInitiativeButton');
        if (initiativeButton) {
            initiativeButton.textContent = char.initiative >= 0 ? `+${char.initiative}` : char.initiative;
        }

        // Update ability scores and modifiers
        const sheetAttributes = document.getElementById('sheetAttributes');
        if (sheetAttributes) {
            sheetAttributes.innerHTML = ''; // Clear existing content
            for (const [ability, score] of Object.entries(char.abilityScores)) {
                const modifier = Math.floor((score - 10) / 2);
                const attributeBox = document.createElement('div');
                attributeBox.className = 'attribute-box';
                attributeBox.innerHTML = `
                    <div class="attribute-name">${ability.charAt(0).toUpperCase() + ability.slice(1)}</div>
                    <div class="attribute-score">${score}</div>
                    <button class="roll-button attribute-check" data-ability="${ability}" data-modifier="${modifier}">
                        Check (${modifier >= 0 ? '+' : ''}${modifier})
                    </button>
                    <button class="roll-button attribute-save" data-ability="${ability}" data-bonus="${char.savingThrows[ability].value}">
                        Save (${char.savingThrows[ability].value >= 0 ? '+' : ''}${char.savingThrows[ability].value})
                        ${char.savingThrows[ability].proficient ? '<span class="proficient-marker">●</span>' : ''}
                    </button>
                `;
                sheetAttributes.appendChild(attributeBox);
            }
        }

        // Update skills
        const sheetSkills = document.getElementById('sheetSkills');
        if (sheetSkills) {
            sheetSkills.innerHTML = ''; // Clear existing content
            for (const [skillName, skillInfo] of Object.entries(char.skills)) {
                const skillBox = document.createElement('div');
                skillBox.className = 'skill-box';
                skillBox.innerHTML = `
                    <div class="skill-name">${skillName}</div>
                    <button class="skill-bonus roll-button" data-skill="${skillName}" data-bonus="${skillInfo.bonus}">
                        ${skillInfo.bonus >= 0 ? '+' : ''}${skillInfo.bonus}
                    </button>
                    ${skillInfo.proficient ? '<span class="proficient-marker">●</span>' : ''}
                `;
                sheetSkills.appendChild(skillBox);
            }
        }

        // Update inventory
        const inventoryList = document.getElementById('inventoryList');
        if (inventoryList) {
            inventoryList.innerHTML = ''; // Clear existing content
            char.inventory.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.name;
                inventoryList.appendChild(li);
            });
        }

        // Update currency
        ['copper', 'silver', 'electrum', 'gold', 'platinum'].forEach(currency => {
            const input = document.getElementById(`${currency}Input`);
            if (input) {
                input.value = char.currency[currency] || 0;
            }
        });

        // Update spell slots
        updateDnDBeyondSimplifiedSpellSlots(character);

        // Update combat section
        //updateCombatSection(char);

        // Update character notes
        const characterNotes = document.getElementById('characterNotes');
        if (characterNotes) {
            characterNotes.value = char.notes || '';
        }

        // Update features and traits
        const featuresList = document.getElementById('featuresList');
        if (featuresList) {
            featuresList.innerHTML = ''; // Clear existing content
            // Add logic to populate features and traits here
        }

        console.log('D&D Beyond character sheet updated successfully');
    } catch (error) {
        console.error('Error updating D&D Beyond character sheet:', error);
    }
}

function updateDnDBeyondTraits(character) {
    const raceTraitsList = document.getElementById('raceTraitsList');
    if (!raceTraitsList) {
        console.warn('Race traits list element not found');
        return;
    }

    raceTraitsList.innerHTML = '';

    // Add personality traits
    if (character.personalityTraits) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Personality Traits:</strong> ${character.personalityTraits}`;
        raceTraitsList.appendChild(li);
    }

    // Add ideals
    if (character.ideals) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Ideals:</strong> ${character.ideals}`;
        raceTraitsList.appendChild(li);
    }

    // Add bonds
    if (character.bonds) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Bonds:</strong> ${character.bonds}`;
        raceTraitsList.appendChild(li);
    }

    // Add flaws
    if (character.flaws) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Flaws:</strong> ${character.flaws}`;
        raceTraitsList.appendChild(li);
    }

    // Add appearance
    if (character.appearance) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Appearance:</strong> ${character.appearance}`;
        raceTraitsList.appendChild(li);
    }

    if (raceTraitsList.children.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No traits available.';
        raceTraitsList.appendChild(li);
    }
}

function calculateImportedCharacterStats(char) {
    // Calculate ability modifiers
    for (let ability in char.abilityScores) {
        char[`${ability}Modifier`] = Math.floor((char.abilityScores[ability] - 10) / 2);
    }

    // Update saving throws
    for (let save in char.savingThrows) {
        char.savingThrows[save].value = char[`${save}Modifier`] || 0;
        if (char.savingThrows[save].proficient) {
            char.savingThrows[save].value += char.proficiencyBonus;
        }
    }

    // Update skills
    const skillNames = Object.keys(char.skills);
    for (let skillName of skillNames) {
        let associatedAbility = getAssociatedAbility(skillName);
        if (!char.skills[skillName]) {
            char.skills[skillName] = { bonus: 0, proficient: false };
        }
        char.skills[skillName].bonus = char[`${associatedAbility}Modifier`] || 0;
        if (char.skills[skillName].proficient) {
            char.skills[skillName].bonus += char.proficiencyBonus;
        }
        if (char.skills[skillName].expertise) {
            char.skills[skillName].bonus += char.proficiencyBonus;
        }
    }

    // Calculate passive perception
    const perceptionSkill = skillNames.find(name => name.toLowerCase().includes('perception'));
    if (perceptionSkill) {
        char.passivePerception = 10 + (char.skills[perceptionSkill].bonus || 0);
    } else {
        char.passivePerception = 10 + (char.wisdomModifier || 0);
    }

    // Calculate spell save DC and spell attack bonus
    if (char.spellcasting && char.spellcasting.ability) {
        let spellAbilityModifier;
        if (typeof char.spellcasting.ability === 'string') {
            spellAbilityModifier = char[`${char.spellcasting.ability.toLowerCase()}Modifier`] || 0;
        } else if (typeof char.spellcasting.ability === 'number') {
            // Assuming the ability is stored as 1 = STR, 2 = DEX, etc.
            const abilityNames = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
            const abilityName = abilityNames[char.spellcasting.ability - 1];
            spellAbilityModifier = char[`${abilityName}Modifier`] || 0;
        } else {
            console.warn('Unexpected spellcasting ability format:', char.spellcasting.ability);
            spellAbilityModifier = 0;
        }
        char.spellcasting.spellSaveDC = 8 + char.proficiencyBonus + spellAbilityModifier;
        char.spellcasting.spellAttackBonus = char.proficiencyBonus + spellAbilityModifier;
    }

    // Calculate initiative if not provided
    if (char.initiative === undefined) {
        char.initiative = char.dexterityModifier || 0;
    }

    // Calculate AC if not provided (assuming unarmored)
    if (char.ac === undefined) {
        char.ac = 10 + (char.dexterityModifier || 0);
    }

    // Calculate max HP if not provided
    if (char.maxHp === undefined) {
        let conModifier = char.constitutionModifier || 0;
        let avgHitDie = Math.floor(char.hitDie.faces / 2) + 1;
        char.maxHp = char.hitDie.faces + conModifier + ((char.level - 1) * (avgHitDie + conModifier));
    }

    // Set current HP to max if not provided
    if (char.hp === undefined) {
        char.hp = char.maxHp;
    }
}

function getAssociatedAbility(skill) {
    const skillAbilities = {
        acrobatics: 'dexterity',
        'animal handling': 'wisdom',
        arcana: 'intelligence',
        athletics: 'strength',
        deception: 'charisma',
        history: 'intelligence',
        insight: 'wisdom',
        intimidation: 'charisma',
        investigation: 'intelligence',
        medicine: 'wisdom',
        nature: 'intelligence',
        perception: 'wisdom',
        performance: 'charisma',
        persuasion: 'charisma',
        religion: 'intelligence',
        'sleight of hand': 'dexterity',
        stealth: 'dexterity',
        survival: 'wisdom'
    };
    
    const normalizedSkill = skill.toLowerCase().replace(/[^a-z ]/g, '');
    return skillAbilities[normalizedSkill] || 'intelligence';
}



// This is the end of the script
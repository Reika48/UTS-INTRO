document.getElementById("playerName").textContent = localStorage.getItem("playerName") || "Pemain";
document.getElementById("playerCharacter").src =
    localStorage.getItem("playerCharacter") ||
    "../bagaian1/aset karakter/karakter1.gif";

    let status = {
        hunger: 50,
        energy: 50,
        hygiene: 50,
        happiness: 50,
        money: 500
    };
    
    const startTime = new Date(); 
    
    function updateGameTime() {
        const realTime = new Date();
        
        const elapsedSeconds = Math.floor((realTime - startTime) / 1000);
        
        let gameMinutes = elapsedSeconds;
        let gameHours = (realTime.getHours() + Math.floor(gameMinutes / 60)) % 24;
        let gameDays = realTime.getDate();
    
        gameMinutes = gameMinutes % 60;
    
        let greeting = "Good morning";
        if (gameHours >= 12) greeting = "Good afternoon";
        if (gameHours >= 18) greeting = "Good evening";
        if (gameHours >= 22) greeting = "Good night";
    
        document.getElementById("greetingText").textContent =
            `${greeting}, ${localStorage.getItem("playerName")}`;
    
        document.getElementById("gameTime").textContent =
            `Day ${gameDays} | ${
                String(gameHours).padStart(2, '0')
            }:${
                String(gameMinutes).padStart(2, '0')
            }`;
    
        if (gameMinutes % 5 === 0) {
            status.hunger -= 1;
            status.energy -= 1;
            status.hygiene -= 1;
        }
        updateStatusBars();
    }
    
    setInterval(updateGameTime, 1000);
    


function updateStatusBars() {
    document.getElementById("hungerBar").value = status.hunger;
    document.getElementById("energyBar").value = status.energy;
    document.getElementById("hygieneBar").value = status.hygiene;
    document.getElementById("happinessBar").value = status.happiness;
    document.getElementById("playerMoney").textContent = `💰 ${status.money} Coins`;

    if (
        status.hunger <= 0 ||
        status.energy <= 0 ||
        status.hygiene <= 0 ||
        status.happiness <= 0
    ) {
        triggerGameOver();
    }
}

function triggerGameOver() {
    document.getElementById("game-over").classList.remove("hidden");
    document.getElementById("hud").classList.add("hidden");
    document.getElementById("status-bars").classList.add("hidden");
    document.getElementById("playerCharacter").classList.add("hidden");
    document.getElementById("Arena1").classList.add("hidden");
    document.getElementById("tombol1").classList.add("hidden");
    document.getElementById("gambarmap").classList.add("hidden");
    document.getElementById("location-actions").classList.add("hidden");
    document.getElementById("la1").classList.add("hidden");
}

document.getElementById("restart-btn").addEventListener("click", () => {
    window.location.href = "gameplay.html";
});

let character = document.getElementById("playerCharacter");
let position = {
    top: window.innerHeight / 2,
    left: window.innerWidth / 2
};

function movePlayer(direction) {
    let step = 20;
    if (direction === "up") position.top -= step;
    if (direction === "down") position.top += step;
    if (direction === "left") position.left -= step;
    if (direction === "right") position.left += step;

    position.top = Math.max(0, Math.min(window.innerHeight - 50, position.top));
    position.left = Math.max(0, Math.min(window.innerWidth - 50, position.left));

    character.style.top = position.top + "px";
    character.style.left = position.left + "px";

    status.hunger -= 1;
    status.energy -= 1;
    status.hygiene -= 1;
    status.happiness += 1; 

    updateStatusBars();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" || event.key === "w") movePlayer("up");
    if (event.key === "ArrowDown" || event.key === "s") movePlayer("down");
    if (event.key === "ArrowLeft" || event.key === "a") movePlayer("left");
    if (event.key === "ArrowRight" || event.key === "d") movePlayer("right");
});

const locationActionsMap = {
    home: [
        { text: 'Get Meal', effect: () => { status.hunger = 100; updateStatusBars(); } },
        { text: 'Take Bath', effect: () => { status.hygiene = 100; updateStatusBars(); } },
        { text: 'Sleep', effect: () => { status.energy = 100; updateStatusBars(); } },
        {
            text: '❗Do Chores',
            effect: () => {
                status.money += 20;
                status.hygiene = Math.max(0, status.hygiene - 20);
                updateStatusBars();
            },
            moneyImpact: ' +20 coin, but -20% hygiene'
            
        },
        {
            text: 'Go To Home',
            effect: () => {
                status.money = Math.max(0, status.money - 25);
                updateStatusBars();
                window.location.href = '../lokasi1 home/home.html';
            },
            moneyImpact: '-25 coin'
        }
    ],
    beach: [
        {
            text: 'Sand Play',
            effect: () => {
                status.happiness = Math.min(100, status.happiness + 10);
                status.energy = Math.max(0, status.energy - 10);
                status.hygiene = Math.max(0, status.hygiene - 10);
                updateStatusBars();
            }
        },
        {
            text: '❗Buy Drink',
            effect: () => {
                if (status.money >= 10) {
                    status.money -= 10;
                    status.energy = Math.min(100, status.energy + 10);
                    status.hunger = Math.min(100, status.hunger + 10);
                } else {
                    alert('Uang tidak cukup!');
                }
                updateStatusBars();
            },
            moneyImpact: '-10 coin'
        },
        {
            text: '❗Buy Snack',
            effect: () => {
                if (status.money >= 25) {
                    status.money -= 25;
                    status.energy = Math.min(100, status.energy + 10);
                    status.hunger = Math.min(100, status.hunger + 10);
                } else {
                    alert('Uang tidak cukup!');
                }
                updateStatusBars();
            },
            moneyImpact: '-25 coin'
        },
        {
            text: 'Build Sandcastle',
            effect: () => {
                status.happiness = Math.min(100, status.happiness + 10);
                status.energy = Math.max(0, status.energy - 5);
                status.hunger = Math.max(0, status.hunger - 5);
                status.hygiene = Math.max(0, status.hygiene - 5);
                updateStatusBars();
            }
        },
        {
            text: '❗Pick-Up trash',
            effect: () => {
                status.money += 20;
                status.hygiene = Math.max(0, status.hygiene - 10);
                updateStatusBars();
            },
            moneyImpact: '+20 coin, -10% hygiene'
        },
        {
            text: '❗Buy Souvenirs',
            effect: () => {
                if (status.money >= 20) {
                    status.money -= 20;
                    status.happiness = Math.min(100, status.happiness + 10);
                } else {
                    alert('Uang tidak cukup!');
                }
                updateStatusBars();
            },
            moneyImpact: '-20 coin, +10% happiness'
        },
        {
            text: 'Go To Pantai Parangtritis',
            effect: () => {
                status.money = Math.max(0, status.money - 25);
                updateStatusBars();
                window.location.href = '../lokasi2 beach/beach.html';
            },
            moneyImpact: '-25 coin'
        }
    ],
    lake: [
        {
            text: 'Fish',
            effect: () => {
                status.happiness = Math.min(100, status.happiness + 10);
                status.energy = Math.max(0, status.energy - 5);
                status.hunger = Math.max(0, status.hunger - 5);
                updateStatusBars();
            }
        },
        {
            text: '❗Buy Souvenirs',
            effect: () => {
                if (status.money >= 20) {
                    status.money -= 20;
                    status.happiness = Math.min(100, status.happiness + 10);
                } else {
                    alert('Uang tidak cukup!');
                }
                updateStatusBars();
            },
            moneyImpact: '-20 coin, +10% happiness'
        },
        {
            text: 'Swim',
            effect: () => {
                status.happiness = Math.min(100, status.happiness + 5);
                status.hygiene = Math.min(100, status.hygiene + 5);
                status.energy = Math.max(0, status.energy - 5);
                status.hunger = Math.max(0, status.hunger - 5);
                updateStatusBars();
            }
        },
        {
            text: 'Picnic',
            effect: () => {
                status.hunger = Math.min(100, status.hunger + 5);
                status.energy = Math.min(100, status.energy + 5);
                status.happiness = Math.min(100, status.happiness + 5);
                updateStatusBars();
            }
        },
        {
            text: '❗Photography',
            effect: () => {
                status.money += 20;
                status.energy = Math.max(0, status.energy - 5);
                updateStatusBars();
            },
            moneyImpact: '+20 coin, -5% energy'
        },
        {
            text: 'Go To Danau Toba',
            effect: () => {
                status.money = Math.max(0, status.money - 25);
                updateStatusBars();
                window.location.href = '../lokasi3 lake/lake.html';
            },
            moneyImpact: '-25 coin'
        }
    ],
    temple: [
        {
            text: 'Pray',
            effect: () => {
                status.happiness = Math.min(100, status.happiness + 5);
                updateStatusBars();
            }
        },
        {
            text: 'Meditate',
            effect: () => {
                status.happiness = Math.min(100, status.happiness + 5);
                status.hunger = Math.max(0, status.hunger - 5);
                updateStatusBars();
            }
        },
        {
            text: 'Read',
            effect: () => {
                status.happiness = Math.min(100, status.happiness + 5);
                updateStatusBars();
            }
        },
        {
            text: '❗Clean',
            effect: () => {
                status.money += 20;
                status.hygiene = Math.max(0, status.hygiene - 10);
                updateStatusBars();
            },
            moneyImpact: '+20 coin, -10% hygiene'
        },
        {
            text: '❗Donate',
            effect: () => {
                if (status.money >= 20) {
                    status.money -= 20;
                    status.happiness = Math.min(100, status.happiness + 5);
                } else {
                    alert('Uang tidak cukup!');
                }
                updateStatusBars();
            },
            moneyImpact: '-20 coin, +5% happiness'
        },
        {
            text: 'Go To Pura besakih',
            effect: () => {
                status.money = Math.max(0, status.money - 25);
                updateStatusBars();
                window.location.href = '../lokasi5 temple/temple.html';
            },
            moneyImpact: '-25 coin'
        }
    ],
    mountain: [
        {
            text: 'Hike',
            effect: () => {
                status.happiness = Math.min(100, status.happiness + 15);
                status.hunger = Math.max(0, status.hunger - 5);
                status.energy = Math.max(0, status.energy - 5);
                status.hygiene = Math.max(0, status.hygiene - 5);
                updateStatusBars();
            }
        },
        {
            text: 'Camp',
            effect: () => {
                status.hunger = Math.min(100, status.hunger + 5);
                status.energy = Math.min(100, status.energy + 5);
                status.happiness = Math.min(100, status.happiness + 5);
                updateStatusBars();
            }
        },
        {
            text: '❗Gather Wood',
            effect: () => {
                status.money += 50;
                status.hygiene = Math.max(0, status.hygiene - 5);
                status.hunger = Math.max(0, status.hunger - 5);
                status.energy = Math.max(0, status.energy - 5);
                updateStatusBars();
            },
            moneyImpact: '+50 coin, -5% 🛁🍗🛏️'
        },
        {
            text: 'Cook',
            effect: () => {
                status.energy = Math.min(100, status.energy + 10);
                status.hunger = Math.min(100, status.hunger + 10);
                status.hygiene = Math.max(0, status.hygiene - 5);
                updateStatusBars();
            },
        },
        {
            text: '❗Buy Souvenirs',
            effect: () => {
                if (status.money >= 50) {
                    status.money -= 50;
                    status.happiness = Math.min(100, status.happiness + 10);
                } else {
                    alert('Uang tidak cukup!');
                }
                updateStatusBars();
            },
            moneyImpact: '-50 coin, +10% happiness'
        },
        {
            text: 'Rest',
            effect: () => {
                status.energy = Math.min(100, status.energy + 5);
                status.hygiene = Math.min(100, status.hygiene + 5);
                updateStatusBars();
            }
        },
        {
            text: 'Go To Gunung Rinjani',
            effect: () => {
                status.money = Math.max(0, status.money - 25);
                updateStatusBars();
                window.location.href = '../lokasi4 mountain/mountain.html';
            },
            moneyImpact: '-25 coin'
        }
    ],
    workplace: [
        {
            text: '❗Work',
            effect: () => {
                status.money += 500;
                status.hygiene = Math.max(0, status.hygiene - 20);
                status.hunger = Math.max(0, status.hunger - 20);
                status.energy = Math.max(0, status.energy - 20);
                status.happiness = Math.max(0, status.happiness - 20);
                updateStatusBars();
            },
            moneyImpact: '+500 coin, -20% hygiene, hunger, energy, happiness'
        },
        {
            text: '❗Buy Drink',
            effect: () => {
                if (status.money >= 50) {
                    status.money -= 50;
                    status.energy = Math.min(100, status.energy + 5);
                    status.hunger = Math.min(100, status.hunger + 5);
                } else {
                    alert('Uang tidak cukup!');
                }
                updateStatusBars();
            },
            moneyImpact: '-50 coin, +5% energy, hunger'
        },
        {
            text: '❗Buy Food',
            effect: () => {
                if (status.money >= 50) {
                    status.money -= 50;
                    status.energy = Math.min(100, status.energy + 15);
                    status.hunger = Math.min(100, status.hunger + 15);
                } else {
                    alert('Uang tidak cukup!');
                }
                updateStatusBars();
            },
            moneyImpact: '-50 coin, +15% energy, hunger'
        },
        {
            text: 'Pray',
            effect: () => {
                status.happiness = Math.min(100, status.happiness + 5);
                updateStatusBars();
            }
        },
        {
            text: 'Go To Workplace',
            effect: () => {
                status.money = Math.max(0, status.money - 25);
                updateStatusBars();
                window.location.href = '../lokasi6 workplace/workplace.html';
            },
            moneyImpact: '-25 coin'
        }
    ]
};

function showActions(location) {
    const locTitle = document.getElementById('location-title');
    locTitle.textContent = location.charAt(0).toUpperCase() + location.slice(1);

    const actionButtons = document.getElementById('action-buttons');
    actionButtons.innerHTML = '';

    const actions = locationActionsMap[location];
    if (!actions) return;

    actions.forEach(actionObj => {
        let btn = document.createElement('button');
        btn.textContent = actionObj.text;
        btn.className = 'px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 relative';

        let tooltipBox = document.createElement('div');
        tooltipBox.className = 'tooltip-box hidden absolute left-[-180px] top-0 bg-yellow-300 text-black p-2 rounded-md shadow-md';
        tooltipBox.textContent = actionObj.moneyImpact ? actionObj.moneyImpact : 'Affects status';

        btn.onclick = () => {
            actionObj.effect(); 

            document.querySelectorAll('.tooltip-box').forEach(el => el.classList.add('hidden'));

            tooltipBox.classList.toggle('hidden');

            updateStatusBars();
        };

        btn.appendChild(tooltipBox);
        actionButtons.appendChild(btn);
    });

    document.getElementById('location-actions').classList.remove('hidden');
}



setInterval(updateGameTime, 1000);
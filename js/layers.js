addLayer("s", {
    name: "Scion", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fccd12",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "attempts", // Name of prestige currency
    baseResource: "seconds to save the world", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    prestigeButtonText() {
        return "Reset: Try another path"
    },
    getResetGain() {
        return new Decimal(1)
    },
    getNextAt(canMax=false) {
        return new Decimal(10000)
    },
    canReset() {
        return true
    },
    onPrestige(gain) {
        return
    },
    prestigeNotify() {
        //super hacky fix, need to change this later
        if ((player.points < 0.02 && player.points != 0) || (player["m"].points < 0.1 && player["m"].points != 0)) {
            player.tab = "s"
            return true
        } else if (player. points == 0 || player["m"].points == 0) {
            return true
        } 
        else {
            return false
        }
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset back to the beginning", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    infoboxes: {
        lore1: {
            title: "Failure",
            body() { return "Failure is inevitable; with so many branching paths, it's inevitable that you eventually take the wrong one. However, trying again is simple, and you can learn from your mistakes.<br><br> (Press 's' at any time to immediately reset)"}
        },
        lore2: {
            title: "The End",
            body() { return "You didn't make it in time, a path too long, or a path too slow, regardless it all ends here. You must be quicker or smarter if you ever hope to succeed."},
            unlocked() {
            if (player.points == 0) {
                    return true
                } else {
                    return false
                }
            }
        },
    },

    tabFormat: [
        ["infobox", "lore1"],
        ["infobox", "lore2"],
        "main-display",
        "prestige-button",
        "resource-display"
    ]
})

addLayer("m", {
    name: "Memory", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(100),
    }},
    color: "#f2aeb1",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "memories", // Name of prestige currency
    baseResource: "seconds to save the world", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    prestigeButtonText() {
        return "Button Not Needed?"
    },
    getResetGain() {
        return new Decimal(1)
    },
    getNextAt(canMax=false) {
        return new Decimal(10000)
    },
    canReset() {
        return false
    },
    onPrestige(gain) {
        return
    },
    prestigeNotify() {
        return false
    },
    passiveGeneration() {
        let gen = new Decimal(-5)
        if (hasUpgrade(this.layer, 11)) {
            gen = new Decimal(-2)
        }
        if (hasUpgrade(this.layer, 13)) {
            gen = new Decimal(1)
        }
        return gen
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        // {key: "m", description: "M: ???", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {
        if (player.points > 0) {
            return true
        } else {
            return false
        }
    },
    tabFormat: [
        ["infobox", "lore1"],
        ["infobox", "lore2"],
        ["infobox", "lore3"],
        ["infobox", "hint1"],
        "main-display",
        "resource-display",
        "upgrades"
    ],
    infoboxes: {
        lore1: {
            title: "The Beginning",
            body() { return "You wake up with visions of beings beyond your comprehensions. The memory of these visions is rapidly fading. You feel the urgent need to remember, that if these memories fade something terrible will happen.<br><br>Your uncle and his friend stare at you from across the room, they both look terrified. Looking around, you notice that the door leading outside is slightly ajar. Your uncle's friend is holding a bag with a red cross on it, but he has a loose grip on it."}
        },
        lore2: {
            title: "Concoction",
            body() { return "You feel light-headed as the concoction begins to take a toll on your body."},
            unlocked() {
            if (hasUpgrade(this.layer, 31) && !hasUpgrade(this.layer, 13)) {
                    return true
                } else {
                    return false
                }
            }
        },
        lore3: {
            title: "Dreams",
            body() { return "As you drift off and begin to dream, the memories solidify, those that were lost begin to return."},
            unlocked() {
            if (hasUpgrade(this.layer, 13) && !hasUpgrade(this.layer, 15)) {
                    return true
                } else {
                    return false
                }
            }
        },
        hint1: {
            title: "Timing",
            body() { return "A moment of clarity: 'Sometimes a path walked previously was unfruitful because the steps you took were in the wrong order. Perhaps there are more possibilities than you initially concieved of.'"},
            unlocked() {
                if (hasUpgrade(this.layer, 33)) {
                    return true
                } else {
                    return false
                }
            }
        },
    },
    upgrades: {
        11: {
            title: "Stop thinking",
            description: "You're not sure how this would help.",
            cost: new Decimal(20),
            onPurchase() {
                player.points = player.points.add(-20)
            }
        },
        12: {
            title: "Lay back down",
            description: "Seems kind of like giving up.",
            cost: new Decimal(20),
            unlocked() {
                if ((!hasUpgrade(this.layer, 15) && !hasUpgrade(this.layer, 31)) || hasUpgrade(this.layer, 12)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
            }
        },
        13: {
            title: "Lay back down",
            description: "Seems kind of like giving up.",
            cost: new Decimal(20),
            unlocked() {
                if ((!hasUpgrade(this.layer, 15) || hasUpgrade(this.layer, 13)) && !hasUpgrade(this.layer, 12) && hasUpgrade(this.layer, 31)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
            }
        },
        14: {
            title: "Explain everything",
            description: "They deserve to know.",
            cost: new Decimal(20),
            unlocked() {
                if (!hasUpgrade(this.layer, 15) || hasUpgrade(this.layer, 14)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
            }
        },
        15: {
            title: "Leave the house",
            description: "There might be more to do outside.",
            cost: new Decimal(20),
            onPurchase() {
                player.points = player.points.add(-20)
            }
        },
        16: {
            title: "Steal the medicine bag",
            description: "There could be something useful in there.",
            cost: new Decimal(20),
            unlocked() {
                if (!hasUpgrade(this.layer, 15) || hasUpgrade(this.layer, 16)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].bagObtained = true
            }
        },
        21: {
            title: "Mix white powder with green liquid",
            description: "You might be able to use this mixture for something.",
            cost: new Decimal(20),
            unlocked() {
                if (hasUpgrade(this.layer, 16)
                    && !hasUpgrade(this.layer, 25)
                    && !hasUpgrade(this.layer, 24)
                    && !hasUpgrade(this.layer, 22)
                    && !hasUpgrade(this.layer, 23)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].mixed1 = true
            }
        },
        22: {
            title: "Mix green liquid with orange powder",
            description: "You might be able to use this mixture for something.",
            cost: new Decimal(20),
            unlocked() {
                if (hasUpgrade(this.layer, 16)
                    && !hasUpgrade(this.layer, 24)
                    && !hasUpgrade(this.layer, 21)
                    && !hasUpgrade(this.layer, 23)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].mixed2 = true
            }
        },
        23: {
            title: "Mix orange powder with white powder",
            description: "You might be able to use this mixture for something.",
            cost: new Decimal(20),
            unlocked() {
                if (hasUpgrade(this.layer, 16) 
                    && !hasUpgrade(this.layer, 25)
                    && !hasUpgrade(this.layer, 21)
                    && !hasUpgrade(this.layer, 22)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].mixed3 = true
            }
        },
        24: {
            title: "Drink the green liquid",
            description: "Looks kind of gross.",
            cost: new Decimal(20),
            unlocked() {
                if (hasUpgrade(this.layer, 16) 
                    && !hasUpgrade(this.layer, 21) 
                    && !hasUpgrade(this.layer, 22)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].greenLiquidDrunk = true
            }
        },
        25: {
            title: "Snort the white powder",
            description: "Maybe it's not what it looks like.",
            cost: new Decimal(20),
            unlocked() {
                if (hasUpgrade(this.layer, 16) 
                    && !hasUpgrade(this.layer, 21) 
                    && !hasUpgrade(this.layer, 23)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].whitePowderUsed = true
            }
        },
        31: {
            title: "Consume your concoction",
            description: "Looks really gross.",
            cost: new Decimal(20),
            unlocked() {
                if (hasUpgrade(this.layer, 21)
                    && !hasUpgrade(this.layer, 34)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
            }
        },
        32: {
            title: "Consume your concoction",
            description: "Looks really gross.",
            cost: new Decimal(20),
            unlocked() {
                if (hasUpgrade(this.layer, 22)
                    && !hasUpgrade(this.layer, 35)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].concotion2used = true
            }
        },
        33: {
            title: "Consume your concoction",
            description: "Looks really gross.",
            cost: new Decimal(20),
            unlocked() {
                if (hasUpgrade(this.layer, 23)
                    && !hasUpgrade(this.layer, 36)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
            }
        },
        34: {
            title: "Convince your uncle to drink the concoction",
            description: "You're not sure how you'll do this, but you will.",
            cost: new Decimal(20),
            unlocked() {
                if (hasUpgrade(this.layer, 21)
                    && !hasUpgrade(this.layer, 31)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
            }
        },
        35: {
            title: "Convince your uncle to drink the concoction",
            description: "You're not sure how you'll do this, but you will.",
            cost: new Decimal(20),
            unlocked() {
                if (hasUpgrade(this.layer, 22)
                    && !hasUpgrade(this.layer, 32)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
            }
        },
        36: {
            title: "Convince your uncle to drink the concoction",
            description: "You're not sure how you'll do this, but you will.",
            cost: new Decimal(20),
            unlocked() {
                if (hasUpgrade(this.layer, 23)
                    && !hasUpgrade(this.layer, 33)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
            }
        },
        37: {
            title: "Explain Further",
            description: "Seems like this explanation might take a bit longer than you thought, the fog sets in.",
            cost: new Decimal(40),
            unlocked() {
                if ((hasUpgrade(this.layer, 14)
                    && !hasUpgrade(this.layer, 15))
                    || hasUpgrade(this.layer, 37)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-200)
            }
        },
        41: {
            title: "Two thousand, one hundred and seventy-four steps",
            description: "Begin your adventure. (Unlocks the next layer)",
            cost: new Decimal(20),
            unlocked() {
                if (hasUpgrade(this.layer, 15)
                    && hasUpgrade(this.layer, 13)) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(3600)
            }
        },
        
    }
})

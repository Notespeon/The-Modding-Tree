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
        return false
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset back to the beginning", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    infoboxes: {
        lore: {
            title: "Failure",
            body() { return "Failure is inevitable; with so many branching paths, it's inevitable that you eventually take the wrong one. However, trying again is simple, and you can learn from your mistakes."}
        }
    }
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
        let gen = new Decimal(-10)
        if (hasUpgrade(this.layer, 11)) {
            gen = new Decimal(-2)
        }
        if (hasUpgrade(this.layer, 13)) {
            gen = new Decimal(0.5)
        }
        return gen
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        // {key: "m", description: "M: ???", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    topsection: [
        ['display-text', function() {
            return "<h2>MAINTENANCE</h2><br><br>\n\
            Life sund and explore...and with a little luck, finally repair the life support systems."
        }]
    ],
    infoboxes: {
        lore: {
            title: "The Beginning",
            body() { return "You wake up with visions of beings beyond your comprehensions. The memory of these visions is rapidly fading. You feel the urgent need to remember, that if these memories fade something terrible will happen.<br><br> Your uncle and his friend stare at you from across the room, they both look terrified. You notice from across the room that the door leading outside is slightly ajar. Your uncle's friend is holding a bag with a red cross on it, but he has a loose grip on it."}
        }
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
            title: "Convince your uncle to drink it",
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
            title: "Convince your uncle to drink it",
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
            title: "Convince your uncle to drink it",
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
        41: {
            title: "Victory!",
            description: "Placeholder for more content, just want to let you know you did it!",
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

import { SlashCommandBuilder } from '@discordjs/builders';
import { readFileSync } from 'fs';
import Command from '../utils/Command.js';
import p from "phin";
import EmbedEngine from '../utils/EmbedEngine.js';

const reactions = [
    {
        name: "kill",
        action: "fucking killed"
    },
    {
        name: "hug",
        action: "hugged :3"
    },
    {
        name: "dodge",
        action: "DODGED"
    },
    {
        name: "kiss",
        action: "kissed 0_0"
    },
    {
        name: "lick",
        action: "licked??"
    },
    {
        name: "love",
        action: "loves"
    },
    {
        name: "slap",
        action: "slapped"
    },
    {
        name: "wave",
        action: "waves :) to"
    },
    {
        name: "trap",
        action: "trapped o_o"
    }
]

const config = JSON.parse(readFileSync("./config.json").toString());

const markov = new Command(
    new SlashCommandBuilder()
        .setName('reaction')
        .addStringOption(option =>
            option.setName('reaction')
                .setDescription('Reaction')
                .setRequired(true)
                .addChoices(reactions.map(e => {
                    return [e.name.charAt(0).toUpperCase() + e.name.slice(1), e.name ]
                })))
        .addUserOption(option => 
            option.setName("user")
                .setDescription("User you want to react to")
                .setRequired(true))
        .setDescription("React.")
);

markov.on("interaction", async interaction => {
    const reaction = reactions.find(e => e.name == interaction.options.getString("reaction", true))
    const user = interaction.options.getUser("user", true);
   
    const res = await p({
        'url': `https://kawaii.red/api/gif/${reaction.name}/token=${config.keys.kawaii}&type=txt/`,
    })

    await interaction.reply({
        embeds: [
            EmbedEngine.success(`${interaction.user.username} ${reaction.action} ${user.username}`)
            .setImage(res.body.toString())
        ]
    })
});

export default markov;
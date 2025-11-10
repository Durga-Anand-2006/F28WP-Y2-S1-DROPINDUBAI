// generate-passwords.js
const bcrypt = require('bcrypt');

async function generateHashes() {
    const users = [
        { id: 1, name: 'Mickey Mouse', password: 'mickey123' },
        { id: 2, name: 'Minnie Mouse', password: 'minnie123' },
        { id: 3, name: 'Bugs Bunny', password: 'bugs123' },
        { id: 4, name: 'SpongeBob SquarePants', password: 'spongebob123' },
        { id: 5, name: 'Daffy Duck', password: 'daffy123' },
        { id: 6, name: 'Tom Cat', password: 'tom123' },
        { id: 7, name: 'Jerry Mouse', password: 'jerry123' },
        { id: 8, name: 'Donald Duck', password: 'donald123' },
        { id: 9, name: 'Daisy Duck', password: 'daisy123' },
        { id: 10, name: 'Scooby Doo', password: 'scooby123' }
    ];

    console.log('Generating bcrypt hashes...\n');
    console.log('Copy these hashes into your SQL file:\n');
    console.log('='.repeat(80));
    
    for(let user of users) {
        const hash = await bcrypt.hash(user.password, 10);
        console.log(`-- User ${user.id}: ${user.name} (password: ${user.password})`);
        console.log(`'${hash}',\n`);
    }
    
    console.log('='.repeat(80));
    console.log('\n✅ Done! Copy the hashes above into your SQL INSERT statement.');
}

generateHashes();
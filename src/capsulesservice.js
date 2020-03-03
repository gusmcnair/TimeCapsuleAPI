const CapsulesService = {
    getCapsules(db){
        return db
            .from('capsules')
            .select('capsules.id', 'capsules.title', 'capsules.burydate', 'capsules.opendates')
    },
    insertCapsules(db, newCapsule){
        return db
            .insert(newCapsule)
            .into('capsules')
            .returning('*')
            .then(capsules => {
                return capsules[0]
            })
    },
    getCapsuleById(db, capsuleId){
        return db
            .from('capsules')
            .select('capsules.id', 'capsules.contents', 'capsules.imageurl', 'capsules.opendates')
            .where('capsules.id', capsuleId)
            .first()
    },
    deleteCapsule(db, capsuleId){
        return db('capsules')
            .where({'id': capsuleId})
            .delete()
    }
}

module.exports = CapsulesService
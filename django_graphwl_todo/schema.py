import graphene
import api.schema
import account.schema

class Query(api.schema.Query, account.schema.Query, graphene.ObjectType):
    pass

class Mutation(api.schema.Mutation, account.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)

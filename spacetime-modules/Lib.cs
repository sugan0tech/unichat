using SpacetimeDB;

public partial class Module {
  [Table(Name = "user", Public = true)]
  public partial class User
  {
    [PrimaryKey]
    public Identity id;
    public string? name;
  }

  [Table(Name = "message", Public = true)]
  public partial class Message
  {
    [PrimaryKey]
    public ulong id;
    public Identity sender;
    public Identity receiver;
    public string content = "";
    public Timestamp timestamp;
  }

  [Reducer]
  public static void RegisterUser(ReducerContext ctx, string name)
  {
    var user = ctx.Db.user.id.Find(ctx.Sender);
    if (user is null)
    {
      ctx.Db.user.Insert(new User{
          id = ctx.Sender,
          name = name
          });
    }
  }

  [Reducer]
  public static void SendMessage(ReducerContext ctx, Identity to, string content)
  {
    ctx.Db.message.Insert(new Message
        {
        id = ctx.Db.message.Count + 1,
        sender = ctx.Sender,
        receiver = to,
        content = content,
        timestamp = ctx.Timestamp
        });
  }

  [Reducer]
  public static void SetName(ReducerContext ctx, string name)
  {
    name = ValidateName(name);

    var user = ctx.Db.user.id.Find(ctx.Sender);
    if (user is not null)
    {
      user.name = name;
      ctx.Db.user.id.Update(user);
    }
  }

  /// Takes a name and checks if it's acceptable as a user's name.
  private static string ValidateName(string name)
  {
    if (string.IsNullOrEmpty(name))
    {
      throw new Exception("Names must not be empty");
    }
    return name;
  }
}
